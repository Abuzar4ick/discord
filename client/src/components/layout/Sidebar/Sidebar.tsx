import {
  selectFilteredServers,
  selectSelectedServer,
  useServerStore,
} from '../../../stores/useServerStore'
import { ChannelList } from './ChannelList'
import { ServerList } from './ServerList'
import { ServerSearchInput } from './ServerSearchInput'

interface SidebarProps {
  onNavigate?: () => void
  className?: string
}

export function Sidebar({ onNavigate, className = '' }: SidebarProps) {
  const searchQuery = useServerStore((s) => s.searchQuery)
  const setSearchQuery = useServerStore((s) => s.setSearchQuery)
  const selectedServerId = useServerStore((s) => s.selectedServerId)
  const selectedChannelId = useServerStore((s) => s.selectedChannelId)
  const selectServer = useServerStore((s) => s.selectServer)
  const selectChannel = useServerStore((s) => s.selectChannel)

  const filteredServers = useServerStore(selectFilteredServers)
  const selectedServer = useServerStore(selectSelectedServer)

  const handleServerSelect = (id: string) => {
    selectServer(id)
    onNavigate?.()
  }

  const handleChannelSelect = (id: string) => {
    selectChannel(id)
    onNavigate?.()
  }

  return (
    <aside
      className={`flex flex-col bg-base-200 border-r border-base-content/10 h-full min-h-0 ${className}`}
      aria-label="Servers and channels"
    >
      <div className="p-3 border-b border-base-content/10 space-y-3 shrink-0">
        <ServerSearchInput value={searchQuery} onChange={setSearchQuery} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50 px-1 mb-1">
            Servers
          </p>
          <ServerList
            servers={filteredServers}
            selectedServerId={selectedServerId}
            onSelect={handleServerSelect}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 min-h-0">
        <ChannelList
          server={selectedServer}
          selectedChannelId={selectedChannelId}
          onSelect={handleChannelSelect}
        />
      </div>
    </aside>
  )
}
