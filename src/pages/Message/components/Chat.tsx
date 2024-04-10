import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Message } from '~/types/message.type'
import { User } from '~/types/user.type'
import { calculateTimeAgo } from '~/utils/helpers'

interface ChatProps {
  currentMessage: Message[]
  targetUser: User
  currentUserID: string
  profile: User
  listUserIDOnline: string[]
  typing: string
  handleSendMessage: (content: string) => void
  handleUserStartTyping: (currentUserID: string, targetUserID: string) => void
  handleUserEndTyping: (currentUserID: string, targetUserID: string) => void
}

function Chat(props: ChatProps) {
  const {
    currentMessage,
    targetUser,
    currentUserID,
    profile,
    listUserIDOnline,
    typing,
    handleSendMessage,
    handleUserStartTyping,
    handleUserEndTyping
  } = props

  const [content, setContent] = useState<string>('')
  const messageListRef = useRef<HTMLDivElement>(null)
  const isOnline = listUserIDOnline.includes(targetUser.user_id)

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  }, [currentMessage])

  return (
    <div className='relative flex-1 border-l'>
      {/* Head */}
      <div className='w- uk-animation-slide-top-medium kan-head z-10 flex items-center justify-between gap-2 border-b px-6 py-3.5 dark:border-slate-700'>
        <div className='flex items-center gap-2 sm:gap-4'>
          {/* toggle for mobile */}
          <button
            type='button'
            className='md:hidden'
            uk-toggle='target: #side-chat ; cls: max-md:-translate-x-full'
            aria-expanded='true'
          ></button>
          <div
            className='relative cursor-pointer'
            uk-toggle='target: .rightt ; cls: hidden'
            tabIndex={0}
            aria-expanded='true'
          >
            <div className='h-11 h-9 w-11 overflow-hidden rounded-full shadow sm:w-9'>
              <img src={targetUser.avatar} className='h-full w-full object-cover' alt='' />
            </div>
            <div
              className={classNames('absolute bottom-0 right-0 m-px h-[10px] w-[10px] rounded-full ', {
                'bg-teal-500': isOnline,
                'bg-red-500': !isOnline
              })}
            />
          </div>
          <div className='cursor-pointer' uk-toggle='target: .rightt ; cls: hidden' tabIndex={0} aria-expanded='true'>
            <div className='text-base font-bold'>
              {targetUser.last_name} {targetUser.first_name}
            </div>
            <div
              className={classNames('text-xs font-semibold', {
                'text-green-500': isOnline,
                'text-red-500': !isOnline
              })}
            >
              {isOnline ? 'Đang hoạt động' : 'Không hoạt động'}
            </div>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <button type='button' className='button__ico'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-6 w-6'>
              <path
                fillRule='evenodd'
                d='M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z'
                clipRule='evenodd'
              />
            </svg>
          </button>
          <button type='button' className='rounded-full p-1.5 hover:bg-slate-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                d='M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'
              />
            </svg>
          </button>
          <button
            type='button'
            className='rounded-full p-1.5 hover:bg-slate-100'
            uk-toggle='target: .rightt ; cls: hidden'
            aria-expanded='true'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Main */}
      <div
        ref={messageListRef}
        className='overflow-x-hidden overflow-y-scroll'
        style={{ height: 'calc(100vh - 144.8px)', scrollbarWidth: 'thin' }}
      >
        {/* Info */}
        <div className='py-15 text-center text-sm lg:pt-8'>
          <img src={targetUser.avatar} className='kan-avatar mx-auto mb-3 h-24 w-24 rounded-full' alt='' />
          <div className='mt-8'>
            <div className='text-base font-medium text-black md:text-xl dark:text-white'>
              {targetUser.last_name} {targetUser.first_name}
            </div>
            <div className='text-sm text-gray-500   dark:text-white/80'>{targetUser.email} </div>
          </div>
          <div className='mt-3.5'>
            <Link
              to={`/profile/${targetUser.user_id}`}
              className='inline-block rounded-lg bg-gray-100 px-4 py-1.5 text-sm font-semibold'
            >
              Xem trang cá nhân
            </Link>
          </div>
        </div>
        {/* Content Chat */}
        <div className='space-y-6 px-5 pb-[85px] text-sm font-medium'>
          {currentMessage.map((message, index) => {
            return (
              <div key={index}>
                {message.sender_id === currentUserID ? (
                  <div>
                    <div className='flex flex-row-reverse items-end gap-3'>
                      <img src={profile.avatar} alt='' className='h-9 w-9 rounded-full shadow' />
                      <div>
                        <span className='mb-2 mr-2 flex flex-row-reverse items-end text-[13px] font-semibold text-gray-600'>{`${message.sender_data.first_name} ${message.sender_data.last_name}`}</span>
                        <div className='flex items-center gap-4'>
                          <div className='cursor-pointer'>
                            <i className='fa-solid fa-reply text-sm text-gray-600'></i>
                            <i className='fa-solid fa-trash ml-4 text-sm text-gray-600'></i>
                          </div>
                          <div className='max-w-sm rounded-[20px] bg-gradient-to-tr from-sky-500 to-blue-500 px-4 py-2 text-white shadow'>
                            {message.content}
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className='mr-14 mt-2 block text-end text-xs font-normal text-gray-500'>
                      {calculateTimeAgo(message.createdAt)}
                    </span>
                  </div>
                ) : (
                  <div>
                    <div>
                      <div className='flex items-center gap-3'>
                        <img src={targetUser.avatar} alt='' className='h-9 w-9 rounded-full shadow' />
                        <div>
                          <span className='mb-2 ml-2 block text-[13px] font-semibold  text-gray-600'>
                            {`${message.sender_data.last_name} ${message.sender_data.first_name}`}
                          </span>
                          <div className='flex items-center gap-4'>
                            <div className='inline-block max-w-sm rounded-[20px] bg-gray-100 px-4 py-2'>
                              {message.content}
                            </div>
                            <div className='cursor-pointer'>
                              <i className='fa-solid fa-reply text-sm text-gray-600'></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className='ml-14 mt-2 block text-xs font-normal text-gray-500'>
                        {calculateTimeAgo(message.createdAt)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
          {typing && (
            <span className='absolute bottom-[75px] block flex items-center gap-1 bg-white font-normal text-gray-500'>
              {typing}
              <img
                className='w-11'
                src='https://assets-v2.lottiefiles.com/a/90bdd36c-1152-11ee-bdb8-cb8fe6b15cf6/IEEkbwMous.gif'
                alt=''
              />
            </span>
          )}
        </div>
      </div>
      {/* Send */}
      <div className='absolute bottom-0 left-0 z-10 flex w-full items-center gap-5  bg-white px-5 py-4'>
        <div className='flex items-center gap-4'>
          <i className='fa-solid fa-plus text-lg'></i>
          <i className='fa-regular fa-face-smile text-lg'></i>
        </div>
        <div className='flex-1'>
          <input
            type='text'
            placeholder='Tìm kiếm'
            className='w-full !rounded-lg bg-[#f1f5f9] !py-[10px] !pl-10 outline-none'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyUp={(e) => {
              if (e.code === 'Enter') {
                handleSendMessage(content)
                setContent('')
              }
            }}
            onBlur={() => {
              handleUserEndTyping(currentUserID, targetUser.user_id)
            }}
            onFocus={() => {
              handleUserStartTyping(currentUserID, targetUser.user_id)
            }}
          />
        </div>
        <div>
          <i className='fa-regular fa-heart text-lg'></i>
        </div>
      </div>
    </div>
  )
}

export default Chat
