interface ChatHeaderProps {
  serverName?: string
  channelName?: string
}

export function ChatHeader({ serverName, channelName }: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-2 border-b border-base-content/10 px-4 py-3 shrink-0 bg-base-100/80">
      {serverName ? (
        <span className="text-sm text-base-content/50 truncate">{serverName}</span>
      ) : null}
      {serverName && channelName ? (
        <span className="text-base-content/30" aria-hidden>
          /
        </span>
      ) : null}
      <h1 className="text-base font-semibold truncate">
        {channelName ? `# ${channelName}` : 'Select a channel'}
      </h1>
    </div>
  )
}
