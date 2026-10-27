export type LoadStatus = 'idle' | 'loading' | 'success' | 'error'

export interface Channel {
  id: string
  serverId: string
  name: string
}

export interface Server {
  id: string
  name: string
  /** Short label for the server icon (emoji or initials). */
  iconLabel: string
  channels: Channel[]
}

export interface Message {
  id: string
  channelId: string
  authorId: string
  authorName: string
  content: string
  createdAt: string
}

export interface UserProfile {
  id: string
  displayName: string
  username: string
  status: 'online' | 'idle' | 'dnd' | 'offline'
}
