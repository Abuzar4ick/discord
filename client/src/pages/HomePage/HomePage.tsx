import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { AppShell } from '../../components/layout/AppShell/AppShell'
import { ChatPanel } from '../../components/chat/ChatPanel/ChatPanel'
import { ErrorState } from '../../components/ui/ErrorState'
import { LoadingState } from '../../components/ui/LoadingState'
import { useServerStore } from '../../stores/useServerStore'

export function HomePage() {
  const status = useServerStore((s) => s.status)
  const error = useServerStore((s) => s.error)
  const loadServers = useServerStore((s) => s.loadServers)

  useEffect(() => {
    void loadServers()
  }, [loadServers])

  useEffect(() => {
    if (status === 'error' && error) toast.error(error)
  }, [status, error])

  if (status === 'loading' || status === 'idle') {
    return (
      <AppShell>
        <LoadingState label="Loading your servers…" />
      </AppShell>
    )
  }

  if (status === 'error') {
    return (
      <AppShell>
        <ErrorState message={error ?? 'Could not load servers'} onRetry={() => void loadServers()} />
      </AppShell>
    )
  }

  return (
    <AppShell>
      <ChatPanel />
    </AppShell>
  )
}
