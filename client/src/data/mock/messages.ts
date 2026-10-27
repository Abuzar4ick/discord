import type { Message } from '../../types/models'

/** Seed messages keyed by channel id — extend when you add channels. */
export const mockMessagesByChannel: Record<string, Message[]> = {
  'ch-1-1': [
    {
      id: 'msg-1',
      channelId: 'ch-1-1',
      authorId: 'user-2',
      authorName: 'Sam',
      content: 'Welcome to Design Guild! Drop your WIP links here.',
      createdAt: '2026-10-25T10:00:00.000Z',
    },
    {
      id: 'msg-2',
      channelId: 'ch-1-1',
      authorId: 'user-3',
      authorName: 'Jordan',
      content: 'Working on a new landing page — feedback welcome.',
      createdAt: '2026-10-25T11:30:00.000Z',
    },
  ],
  'ch-2-1': [
    {
      id: 'msg-3',
      channelId: 'ch-2-1',
      authorId: 'user-4',
      authorName: 'Casey',
      content: 'Anyone up for co-op tonight?',
      createdAt: '2026-10-26T08:00:00.000Z',
    },
  ],
}
