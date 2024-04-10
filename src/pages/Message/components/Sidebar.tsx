import { User } from '~/types/user.type'
import UserItem from './UserItem'

interface SidebarProps {
  currentUserID: string
  listUsers: User[]
  handleConversation: (participant_one: string, participant_two: string, user: User) => void
  listUserIDOnline: string[]
}

function Sidebar(props: SidebarProps) {
  const { listUsers, currentUserID, listUserIDOnline, handleConversation } = props
  const listOnlineUsers: User[] = []
  const listOfflineUsers: User[] = []

  listUsers.forEach((user) => {
    if (user.user_id !== currentUserID) {
      if (listUserIDOnline.includes(user.user_id)) {
        listOnlineUsers.push(user)
      } else {
        listOfflineUsers.push(user)
      }
    }
  })

  return (
    <div className='kan-nav xl:basis-[28%]'>
      <div className='border-b p-4 dark:border-slate-700'>
        <h3 className='text-lg font-semibold'>Trò chuyện</h3>
        <div className='relative mt-4 '>
          <div className='absolute bottom-1/2 left-3 flex translate-y-1/2'>
            <i className='fa-solid fa-magnifying-glass text-gray-400'></i>
          </div>
          <input
            type='text'
            placeholder='Tìm kiếm'
            className='w-full !rounded-lg bg-[#f1f5f9] !py-[10px] !pl-10 outline-none'
          />
        </div>
      </div>
      <div className='overflow-hidde p-2' style={{ height: 'calc(100vh - 232.8px)' }}>
        <span className='block text-sm text-green-500'>Online 😍</span>
        {listOnlineUsers.length !== 0 ? (
          listOnlineUsers.map((user) => {
            const isOnline = listUserIDOnline.includes(user.user_id)

            return (
              <UserItem
                user={user}
                currentUserID={currentUserID}
                isOnline={isOnline}
                handleConversation={handleConversation}
                key={user.user_id}
              />
            )
          })
        ) : (
          <div className='py-5 text-center text-sm text-gray-500'>Hiện không có người dùng hoạt động</div>
        )}
        <span className='mt-5 block text-sm text-red-500'>Offline 😴</span>
        {listOfflineUsers.map((user) => {
          const isOnline = listUserIDOnline.includes(user.user_id)

          return (
            <UserItem
              user={user}
              currentUserID={currentUserID}
              handleConversation={handleConversation}
              isOnline={isOnline}
              key={user.user_id}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
