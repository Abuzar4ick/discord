import type { Server } from '../../../types/models'

interface ServerListProps {
  servers: Server[]
  selectedServerId: string | null
  onSelect: (serverId: string) => void
}

export function ServerList({ servers, selectedServerId, onSelect }: ServerListProps) {
  if (servers.length === 0) {
    return (
      <p className="text-xs text-base-content/50 px-1 py-2">No servers match your search.</p>
    )
  }

  return (
    <ul className="menu menu-sm p-0 gap-0.5 w-full" role="listbox" aria-label="Servers">
      {servers.map((server) => {
        const selected = server.id === selectedServerId
        return (
          <li key={server.id}>
            <button
              type="button"
              role="option"
              aria-selected={selected}
              className={`flex items-center gap-2 rounded-md ${selected ? 'active' : ''}`}
              onClick={() => onSelect(server.id)}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-base-300 text-sm">
                {server.iconLabel}
              </span>
              <span className="truncate">{server.name}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
