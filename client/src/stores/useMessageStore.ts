import { create } from 'zustand'
import { fetchChannelMessages, sendChannelMessage } from '../api/messages.api'
import type { LoadStatus, Message } from '../types/models'
import { getErrorMessage } from '../utils/errors'

interface MessageState {
  messages: Message[]
  activeChannelId: string | null
  fetchStatus: LoadStatus
  sendStatus: LoadStatus
  error: string | null

  loadMessages: (channelId: string) => Promise<void>
  sendMessage: (channelId: string, content: string) => Promise<boolean>
  clearMessages: () => void
}

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [],
  activeChannelId: null,
  fetchStatus: 'idle',
  sendStatus: 'idle',
  error: null,

  loadMessages: async (channelId) => {
    set({ fetchStatus: 'loading', error: null, activeChannelId: channelId })
    try {
      const messages = await fetchChannelMessages(channelId)
      // Ignore stale responses if the user switched channels quickly.
      if (get().activeChannelId !== channelId) return
      set({ messages, fetchStatus: 'success' })
    } catch (err) {
      if (get().activeChannelId !== channelId) return
      set({
        fetchStatus: 'error',
        error: getErrorMessage(err, 'Could not load messages'),
        messages: [],
      })
    }
  },

  sendMessage: async (channelId, content) => {
    const trimmed = content.trim()
    if (!trimmed) return false

    set({ sendStatus: 'loading', error: null })
    try {
      const message = await sendChannelMessage(channelId, trimmed)
      if (get().activeChannelId === channelId) {
        set((state) => ({
          messages: [...state.messages, message],
          sendStatus: 'success',
        }))
      } else {
        set({ sendStatus: 'success' })
      }
      return true
    } catch (err) {
      set({
        sendStatus: 'error',
        error: getErrorMessage(err, 'Could not send message'),
      })
      return false
    }
  },

  clearMessages: () =>
    set({
      messages: [],
      activeChannelId: null,
      fetchStatus: 'idle',
      sendStatus: 'idle',
      error: null,
    }),
}))
