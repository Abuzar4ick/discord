interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 px-4 text-center">
      <p className="text-sm text-error max-w-md">{message}</p>
      {onRetry ? (
        <button type="button" className="btn btn-sm btn-outline" onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </div>
  )
}
