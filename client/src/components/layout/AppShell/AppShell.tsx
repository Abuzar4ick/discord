import { useState, type ReactNode } from 'react'
import { Sidebar } from '../Sidebar/Sidebar'
import { TopNav } from '../TopNav/TopNav'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="flex h-dvh flex-col bg-base-100">
      <TopNav onOpenSidebar={() => setMobileSidebarOpen(true)} />

      <div className="relative flex flex-1 min-h-0">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex w-72 shrink-0 min-h-0">
          <Sidebar className="w-full" />
        </aside>

        {/* Mobile sidebar overlay */}
        {mobileSidebarOpen ? (
          <>
            <button
              type="button"
              className="md:hidden fixed inset-0 z-40 bg-black/60"
              aria-label="Close servers and channels panel"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <aside className="md:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] shadow-2xl">
              <Sidebar
                className="h-full"
                onNavigate={() => setMobileSidebarOpen(false)}
              />
            </aside>
          </>
        ) : null}

        <main className="flex flex-1 flex-col min-w-0 min-h-0">{children}</main>
      </div>
    </div>
  )
}
