import type { Message } from '../../../types/models'

interface MessageItemProps {
  message: Message
}

export function MessageItem({ message }: MessageItemProps) {
  const time = new Date(message.createdAt).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <article className="group flex gap-3 py-1 px-1 rounded-md hover:bg-base-200/40">
      <div className="avatar placeholder shrink-0">
        <span className="bg-neutral text-neutral-content w-10 rounded-full text-sm">
          {message.authorName.slice(0, 2).toUpperCase()}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
          <span className="font-medium text-sm">{message.authorName}</span>
          <time className="text-xs text-base-content/40" dateTime={message.createdAt}>
            {time}
          </time>
        </header>
        <p className="text-sm text-base-content/90 whitespace-pre-wrap break-words">
          {message.content}
        </p>
      </div>
    </article>
  )
}
