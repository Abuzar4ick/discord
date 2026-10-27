import { FormEvent, KeyboardEvent, useState } from 'react'

interface MessageComposerProps {
  disabled?: boolean
  isSending?: boolean
  channelName?: string
  onSend: (content: string) => void
}

export function MessageComposer({
  disabled,
  isSending,
  channelName,
  onSend,
}: MessageComposerProps) {
  const [draft, setDraft] = useState('')

  const submit = () => {
    const trimmed = draft.trim()
    if (!trimmed || disabled || isSending) return
    onSend(trimmed)
    setDraft('')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    submit()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends; Shift+Enter adds a new line (common chat pattern).
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  const placeholder = channelName
    ? `Message #${channelName}`
    : 'Select a channel to start chatting'

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-base-content/10 p-3 md:p-4 bg-base-100 shrink-0"
    >
      <div className="flex gap-2 items-end max-w-4xl mx-auto w-full">
        <label className="sr-only" htmlFor="message-input">
          Message
        </label>
        <textarea
          id="message-input"
          className="textarea textarea-bordered flex-1 min-h-11 max-h-32 resize-y text-sm"
          placeholder={placeholder}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isSending}
          rows={1}
          aria-disabled={disabled || isSending}
        />
        <button
          type="submit"
          className="btn btn-primary shrink-0"
          disabled={disabled || isSending || !draft.trim()}
        >
          {isSending ? (
            <span className="loading loading-spinner loading-sm" aria-hidden />
          ) : (
            'Send'
          )}
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </form>
  )
}
