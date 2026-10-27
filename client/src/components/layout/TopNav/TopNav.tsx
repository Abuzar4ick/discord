import { mockProfile } from '../../../data/mock/profile'

interface TopNavProps {
  onOpenSidebar?: () => void
}

export function TopNav({ onOpenSidebar }: TopNavProps) {
  return (
    <header className="navbar bg-base-300 border-b border-base-content/10 min-h-14 px-3 md:px-4 shrink-0">
      <div className="flex-none md:hidden">
        <button
          type="button"
          className="btn btn-ghost btn-square btn-sm"
          aria-label="Open servers and channels"
          onClick={onOpenSidebar}
        >
          <MenuIcon />
        </button>
      </div>

      <div className="flex-1 gap-2">
        <span className="text-lg font-semibold tracking-tight text-primary">LiteCord</span>
      </div>

      <div className="flex-none">
        <div className="flex items-center gap-2 rounded-lg bg-base-200/80 px-2 py-1">
          <span className="avatar placeholder">
            <span className="bg-primary text-primary-content w-8 h-8 rounded-full text-xs flex items-center justify-center">
              {mockProfile.displayName.slice(0, 2).toUpperCase()}
            </span>
          </span>
          <div className="hidden sm:block text-left leading-tight">
            <p className="text-sm font-medium">{mockProfile.displayName}</p>
            <p className="text-xs text-success capitalize">{mockProfile.status}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}
