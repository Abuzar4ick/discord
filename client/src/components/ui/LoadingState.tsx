interface LoadingStateProps {
  label?: string
  compact?: boolean
}

export function LoadingState({ label = 'Loading…', compact }: LoadingStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 text-base-content/70 ${
        compact ? 'py-6' : 'py-16'
      }`}
      role="status"
      aria-live="polite"
    >
      <span className="loading loading-spinner loading-md text-primary" aria-hidden />
      <span className="text-sm">{label}</span>
    </div>
  )
}
