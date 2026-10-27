interface EmptyStateProps {
  title: string
  description?: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center px-4">
      <p className="text-base font-medium text-base-content">{title}</p>
      {description ? (
        <p className="text-sm text-base-content/60 max-w-sm">{description}</p>
      ) : null}
    </div>
  )
}
