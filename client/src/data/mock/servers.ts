import type { Server } from '../../types/models'

export const mockServers: Server[] = [
  {
    id: 'srv-1',
    name: 'Design Guild',
    iconLabel: '🎨',
    channels: [
      { id: 'ch-1-1', serverId: 'srv-1', name: 'general' },
      { id: 'ch-1-2', serverId: 'srv-1', name: 'feedback' },
      { id: 'ch-1-3', serverId: 'srv-1', name: 'resources' },
    ],
  },
  {
    id: 'srv-2',
    name: 'Game Night',
    iconLabel: '🎮',
    channels: [
      { id: 'ch-2-1', serverId: 'srv-2', name: 'lobby' },
      { id: 'ch-2-2', serverId: 'srv-2', name: 'lfg' },
    ],
  },
  {
    id: 'srv-3',
    name: 'Meme Lab',
    iconLabel: '😂',
    channels: [
      { id: 'ch-3-1', serverId: 'srv-3', name: 'fresh-memes' },
      { id: 'ch-3-2', serverId: 'srv-3', name: 'templates' },
    ],
  },
  {
    id: 'srv-4',
    name: 'Study Circle',
    iconLabel: '📚',
    channels: [{ id: 'ch-4-1', serverId: 'srv-4', name: 'homework-help' }],
  },
]
