import { useContext, useEffect, useState } from 'react'
import { AppContext } from '~/contexts/app.context'
import Loading from '~/components/Loading/Loading'
import { User } from '~/types/user.type'
import useSocket from '~/hooks/useSocket'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import { Message as MessageType } from '~/types/message.type'
import EmptyMessage from './components/EmptyMessage'
import useQueryUsers from './hooks/useQueryUsers'

function Message() {
  const { profile } = useContext(AppContext)
  const [isChating, setIsChatting] = useState<boolean>(false)
  const [targetUser, setTargetUser] = useState<User | null>(null)
  const [currentMessage, setCurrentMessage] = useState<MessageType[]>([])
  const [conversationID, setConversationID] = useState<string>('')
  const [typing, setTyping] = useState<string>('')
  const [listUserIDOnline, setListUserIDOnline] = useState<string[]>([])
  const currentUserID = profile ? profile.user_id : ''
  const socket = useSocket(currentUserID)

  const { data: listUsers, isLoading: isLoadingUser } = useQueryUsers()

  useEffect(() => {
    if (socket) {
      socket.on('list_user_online', (data) => setListUserIDOnline(data))
      socket.on('list_message', (data) => setCurrentMessage(data))
      socket.on('someone_typing', (data: { data: string }) => setTyping(data.data))
      socket.on('conversation_id', (conversation_id) => setConversationID(conversation_id))
    }
  }, [socket])

  // Cuộc trò chuyện
  const handleConversation = (participant_one: string, participant_two: string, user: User) => {
    setIsChatting(true)
    setTargetUser(user)
    if (socket) {
      socket.emit('add_conversation', { participant_one, participant_two })
    }
  }

  // Gửi tin nhắn
  const handleSendMessage = (content: string) => {
    if (socket) {
      const data = {
        conversation_id: conversationID,
        sender_id: profile?.user_id,
        receiver_id: targetUser?.user_id,
        content
      }
      socket.emit('send_message', data)
    }
  }

  const handleUserStartTyping = (currentUserID: string, targetUserID: string) => {
    if (socket) {
      socket.emit('user_typing', {
        sender_id: currentUserID,
        receiver_id: targetUserID
      })
    }
  }

  const handleUserEndTyping = (currentUserID: string, targetUserID: string) => {
    if (socket) {
      socket.emit('user-un-typing', {
        sender_id: currentUserID,
        receiver_id: targetUserID
      })
    }
  }

  if (isLoadingUser) {
    return <Loading />
  }

  return (
    <div className='flex'>
      {/* Sidebar */}
      {listUsers && (
        <Sidebar
          currentUserID={currentUserID}
          listUsers={listUsers.data.data.users}
          listUserIDOnline={listUserIDOnline}
          handleConversation={handleConversation}
        />
      )}
      {/* Chat */}
      {isChating && profile && targetUser ? (
        <Chat
          currentMessage={currentMessage}
          currentUserID={currentUserID}
          profile={profile}
          targetUser={targetUser}
          listUserIDOnline={listUserIDOnline}
          typing={typing}
          handleSendMessage={handleSendMessage}
          handleUserStartTyping={handleUserStartTyping}
          handleUserEndTyping={handleUserEndTyping}
        />
      ) : (
        <EmptyMessage />
      )}
    </div>
  )
}

export default Message
