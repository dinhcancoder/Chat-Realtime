import classNames from 'classnames'
import { User } from '~/types/user.type'

interface UserItemProps {
  user: User
  currentUserID: string
  isOnline: boolean
  handleConversation: (participant_one: string, participant_two: string, user: User) => void
}

function UserItem({ user, handleConversation, currentUserID, isOnline }: UserItemProps) {
  const { user_id, first_name, last_name, avatar } = user

  return (
    <div
      onClick={() => handleConversation(currentUserID, user_id, user)}
      className='relative mt-2 flex cursor-pointer items-center gap-4 rounded-xl p-2 duration-200 hover:bg-gray-100'
    >
      <div className='kan-img relative h-14 w-14 shrink-0'>
        <img src={avatar} alt='' className='h-full w-full rounded-full object-cover' />
        <div
          className={classNames(
            'border-whit absolute bottom-0 right-0 h-4  w-4 rounded-full border dark:border-slate-800',
            {
              'bg-green-500': isOnline,
              'bg-red-500': !isOnline
            }
          )}
        />
      </div>
      <div className='min-w-0 flex-1'>
        <div className='mb-1.5 flex items-center gap-2'>
          <div className='mr-auto text-sm font-medium text-black dark:text-white'>{`${last_name} ${first_name}`}</div>
          <div className='kan-time text-xs font-light text-gray-500 dark:text-white/70'>09:40AM</div>
        </div>
        <div className='overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium'>Tin nhắn mới nhất ...</div>
      </div>
    </div>
  )
}

export default UserItem
