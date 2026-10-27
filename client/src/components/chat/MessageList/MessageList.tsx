import { useEffect, useRef } from 'react'
import type { Message } from '../../../types/models'
import { EmptyState } from '../../ui/EmptyState'
import { LoadingState } from '../../ui/LoadingState'
import { MessageItem } from './MessageItem'

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
  channelName?: string
}

export function MessageList({ messages, isLoading, channelName }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, channelName])

  if (isLoading) {
    return <LoadingState label="Loading messages…" />
  }

  if (messages.length === 0) {
    return (
      <EmptyState
        title={channelName ? `No messages in #${channelName} yet` : 'No messages yet'}
        description="Be the first to say something in this channel."
      />
    )
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      <div ref={bottomRef} aria-hidden />
    </div>
  )
}
