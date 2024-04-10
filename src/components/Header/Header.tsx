import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { io } from 'socket.io-client'
import { AppContext } from '~/contexts/app.context'
import useSocket from '~/hooks/useSocket'
import authApi from '~/services/apis/auth.api'

function Header() {
  const [show, setShow] = useState<boolean>(false)
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)
  const pathName = window.location.pathname
  const socket = useSocket(profile?.user_id)

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      toast.success('Đăng xuất thành công!')
      setIsAuthenticated(false)
      setProfile(null)
    }
  })

  const handleLogout = () => {
    if (socket) {
      socket.emit('user_logout')
    }
    logoutMutation.mutate()
  }

  return (
    <header className='bg-white'>
      <nav className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8' aria-label='Global'>
        <div className='flex lg:flex-1'>
          <Link to={'/'} className='-m-1.5 flex items-center gap-3 p-1.5'>
            <img className='h-8 w-auto' src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600' alt='' />
            <span className='text-xl font-semibold'>Social Network</span>
          </Link>
        </div>
        <div className='hidden lg:flex lg:gap-x-12'>
          <Link
            to={'/'}
            className={classNames('text-sm font-semibold leading-6', {
              'text-blue-600': pathName === '/'
            })}
          >
            Trang chủ
          </Link>
          <Link
            to={'/message'}
            className={classNames('text-sm font-semibold leading-6', {
              'text-blue-600': pathName === '/message'
            })}
          >
            Trò chuyện
          </Link>
          <Link to={'/image'} className='text-sm font-semibold leading-6 text-gray-900'>
            Hình ảnh
          </Link>
          <Link to={'/auth-google'} className='text-sm font-semibold leading-6 text-gray-900'>
            Google
          </Link>
        </div>
        <div className='relative z-20 hidden lg:flex lg:flex-1 lg:justify-end'>
          {isAuthenticated && (
            <div className='relative flex cursor-pointer items-center gap-2' onClick={() => setShow(!show)}>
              <div className='h-8 w-8 rounded-full '>
                <img className='h-full w-full rounded-full object-cover' src={profile?.avatar} alt='' />
              </div>
              <a href='#!' className='text-sm'>
                {`${profile?.first_name}  ${profile?.last_name}`}
              </a>
              {show && (
                <ul
                  onMouseLeave={() => setShow(false)}
                  className='absolute left-2/4 top-10 z-10 w-[210px] -translate-x-1/2 rounded-sm border-[1px] border-gray-200 bg-white p-4 text-sm tracking-wide text-gray-800 shadow-md'
                >
                  <span className='block cursor-no-drop p-2 italic text-gray-400'>
                    Vai trò: {profile?.role_data.description}
                  </span>
                  <li className='p-2'>
                    <Link to={`/profile/${profile?.user_id}`}>Tài khoản của tôi</Link>
                  </li>
                  <li className='p-2'>
                    <a href='#!'>Cài đặt</a>
                  </li>
                  <li className='p-2'>
                    <a onClick={handleLogout}>Đăng xuất</a>
                  </li>
                </ul>
              )}
            </div>
          )}
          {!isAuthenticated && (
            <Link to={'/login'} className='text-sm font-semibold leading-6 text-gray-900'>
              Đăng nhập <i className='fa-solid fa-lock ml-1 text-base'></i>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
