interface ServerSearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function ServerSearchInput({ value, onChange }: ServerSearchInputProps) {
  return (
    <label className="input input-bordered input-sm flex items-center gap-2 bg-base-100/50">
      <span className="sr-only">Search servers</span>
      <SearchIcon />
      <input
        type="search"
        className="grow min-w-0 bg-transparent"
        placeholder="Find a server…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search servers by name"
      />
    </label>
  )
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}
