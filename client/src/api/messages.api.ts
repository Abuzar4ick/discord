import { env } from '../config/env'
import { mockMessagesByChannel } from '../data/mock/messages'
import { mockProfile } from '../data/mock/profile'
import type { Message } from '../types/models'
import { apiClient } from './client'

const MOCK_DELAY_MS = 500

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** In-memory store for mock sends (resets on page refresh). */
const mockSentMessages: Message[] = []

export async function fetchChannelMessages(channelId: string): Promise<Message[]> {
  if (env.useMock) {
    await delay(MOCK_DELAY_MS)
    const seed = mockMessagesByChannel[channelId] ?? []
    const sent = mockSentMessages.filter((m) => m.channelId === channelId)
    return [...seed, ...sent].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )
  }

  const { data } = await apiClient.get<Message[]>(`/channels/${channelId}/messages`)
  return data
}

export async function sendChannelMessage(
  channelId: string,
  content: string,
): Promise<Message> {
  if (env.useMock) {
    await delay(300)
    const message: Message = {
      id: `msg-${crypto.randomUUID()}`,
      channelId,
      authorId: mockProfile.id,
      authorName: mockProfile.displayName,
      content,
      createdAt: new Date().toISOString(),
    }
    mockSentMessages.push(message)
    return message
  }

  const { data } = await apiClient.post<Message>(`/channels/${channelId}/messages`, {
    content,
  })
  return data
}
