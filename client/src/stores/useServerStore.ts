import { create } from 'zustand'
import { fetchServers } from '../api/servers.api'
import type { LoadStatus, Server } from '../types/models'
import { getErrorMessage } from '../utils/errors'

interface ServerState {
  servers: Server[]
  status: LoadStatus
  error: string | null
  searchQuery: string
  selectedServerId: string | null
  selectedChannelId: string | null

  loadServers: () => Promise<void>
  setSearchQuery: (query: string) => void
  selectServer: (serverId: string) => void
  selectChannel: (channelId: string) => void
}

export const useServerStore = create<ServerState>((set, get) => ({
  servers: [],
  status: 'idle',
  error: null,
  searchQuery: '',
  selectedServerId: null,
  selectedChannelId: null,

  loadServers: async () => {
    set({ status: 'loading', error: null })
    try {
      const servers = await fetchServers()
      const first = servers[0]
      const firstChannel = first?.channels[0]
      set({
        servers,
        status: 'success',
        selectedServerId: first?.id ?? null,
        selectedChannelId: firstChannel?.id ?? null,
      })
    } catch (err) {
      set({
        status: 'error',
        error: getErrorMessage(err, 'Could not load servers'),
      })
    }
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  selectServer: (serverId) => {
    const server = get().servers.find((s) => s.id === serverId)
    const firstChannel = server?.channels[0]
    set({
      selectedServerId: serverId,
      selectedChannelId: firstChannel?.id ?? null,
    })
  },

  selectChannel: (channelId) => set({ selectedChannelId: channelId }),
}))

/** Filter servers by name for the sidebar search. */
export function selectFilteredServers(state: ServerState): Server[] {
  const q = state.searchQuery.trim().toLowerCase()
  if (!q) return state.servers
  return state.servers.filter((s) => s.name.toLowerCase().includes(q))
}

export function selectSelectedServer(state: ServerState): Server | undefined {
  return state.servers.find((s) => s.id === state.selectedServerId)
}

export function selectSelectedChannel(state: ServerState) {
  const server = selectSelectedServer(state)
  return server?.channels.find((c) => c.id === state.selectedChannelId)
}
