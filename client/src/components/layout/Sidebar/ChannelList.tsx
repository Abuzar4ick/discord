import type { Channel, Server } from '../../../types/models'

interface ChannelListProps {
  server: Server | undefined
  selectedChannelId: string | null
  onSelect: (channelId: string) => void
}

export function ChannelList({ server, selectedChannelId, onSelect }: ChannelListProps) {
  if (!server) {
    return (
      <p className="text-xs text-base-content/50 px-1">Select a server to see channels.</p>
    )
  }

  if (server.channels.length === 0) {
    return <p className="text-xs text-base-content/50 px-1">This server has no channels yet.</p>
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50 px-2 mb-1">
        {server.name}
      </p>
      <ul className="menu menu-sm p-0 gap-0.5 w-full" role="listbox" aria-label="Channels">
        {server.channels.map((channel: Channel) => {
          const selected = channel.id === selectedChannelId
          return (
            <li key={channel.id}>
              <button
                type="button"
                role="option"
                aria-selected={selected}
                className={`rounded-md ${selected ? 'active' : ''}`}
                onClick={() => onSelect(channel.id)}
              >
                <span className="text-base-content/50">#</span>
                {channel.name}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
