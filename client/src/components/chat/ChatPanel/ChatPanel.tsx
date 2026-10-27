import { useEffect } from 'react'
import toast from 'react-hot-toast'
import {
  selectSelectedChannel,
  selectSelectedServer,
  useServerStore,
} from '../../../stores/useServerStore'
import { useMessageStore } from '../../../stores/useMessageStore'
import { ErrorState } from '../../ui/ErrorState'
import { ChatHeader } from '../ChatHeader/ChatHeader'
import { MessageComposer } from '../MessageComposer/MessageComposer'
import { MessageList } from '../MessageList/MessageList'

export function ChatPanel() {
  const selectedChannel = useServerStore(selectSelectedChannel)
  const selectedServer = useServerStore(selectSelectedServer)

  const messages = useMessageStore((s) => s.messages)
  const fetchStatus = useMessageStore((s) => s.fetchStatus)
  const sendStatus = useMessageStore((s) => s.sendStatus)
  const error = useMessageStore((s) => s.error)
  const loadMessages = useMessageStore((s) => s.loadMessages)
  const sendMessage = useMessageStore((s) => s.sendMessage)

  const channelId = selectedChannel?.id

  useEffect(() => {
    if (!channelId) return
    void loadMessages(channelId)
  }, [channelId, loadMessages])

  // Surface API errors via toaster (stores also keep error for inline UI).
  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  const handleSend = (content: string) => {
    if (!channelId) return
    void sendMessage(channelId, content)
  }

  const isLoading = fetchStatus === 'loading'
  const isSending = sendStatus === 'loading'
  const showFetchError = fetchStatus === 'error' && Boolean(channelId)

  return (
    <section className="flex flex-col flex-1 min-h-0" aria-label="Channel messages">
      <ChatHeader serverName={selectedServer?.name} channelName={selectedChannel?.name} />

      <div className="flex-1 overflow-y-auto min-h-0 bg-base-100/50">
        {!channelId ? (
          <EmptyChannelHint />
        ) : showFetchError ? (
          <ErrorState
            message={error ?? 'Something went wrong'}
            onRetry={() => void loadMessages(channelId)}
          />
        ) : (
          <MessageList
            messages={messages}
            isLoading={isLoading}
            channelName={selectedChannel?.name}
          />
        )}
      </div>

      <MessageComposer
        channelName={selectedChannel?.name}
        disabled={!channelId || showFetchError}
        isSending={isSending}
        onSend={handleSend}
      />
    </section>
  )
}

function EmptyChannelHint() {
  return (
    <div className="flex h-full items-center justify-center p-6 text-center text-sm text-base-content/60">
      Pick a server and channel from the sidebar to join the conversation.
    </div>
  )
}
