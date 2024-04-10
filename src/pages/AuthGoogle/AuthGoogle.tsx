import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { CLIENT_GOOGLE_ID } from '~/constants/google'
import { AuthGoogle as AuthGoogleType } from '~/types/auth.type'

function AuthGoogle() {
  const storedAuthGoogle = localStorage.getItem('authGoogle')
  const [user, setUser] = useState<AuthGoogleType | null>(storedAuthGoogle ? JSON.parse(storedAuthGoogle) : null)

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('authGoogle')
    toast.success('Đăng xuất thành công')
  }

  return (
    <div className='flex w-full items-center justify-center' style={{ height: `calc(100vh - 80px)` }}>
      {user ? (
        <>
          {/* component */}
          <link
            rel='stylesheet'
            href='https://horizon-tailwind-react-corporate-git-main-horizon-ui.vercel.app/static/css/main.d7f96858.css'
          />
          <div className='flex h-[100vh] flex-col items-center justify-center'>
            <div className='dark:!bg-navy-800 relative mx-auto flex w-[400px] flex-col items-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border p-4 shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:text-white dark:shadow-none'>
              <div className='relative flex h-32 w-full justify-center rounded-xl bg-cover'>
                <img
                  src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png'
                  className='absolute flex h-32 w-full justify-center rounded-xl bg-cover'
                />
                <div className='dark:!border-navy-700 absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400'>
                  <img className='h-full w-full rounded-full' src={user.picture} alt='' />
                </div>
              </div>
              <div className='mt-16 flex flex-col items-center'>
                <h4 className='text-navy-700 text-xl font-bold dark:text-white'>{user.name}</h4>
                <p className='text-base font-normal text-gray-600'>{user.email}</p>
              </div>
              <div className='mb-3 mt-6 flex gap-14 md:!gap-14'>
                <div className='flex flex-col items-center justify-center'>
                  <p className='text-navy-700 text-2xl font-bold dark:text-white'>17</p>
                  <p className='text-sm font-normal text-gray-600'>Posts</p>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <p className='text-navy-700 text-2xl font-bold dark:text-white'>9.7K</p>
                  <p className='text-sm font-normal text-gray-600'>Followers</p>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <p className='text-navy-700 text-2xl font-bold dark:text-white'>434</p>
                  <p className='text-sm font-normal text-gray-600'>Following</p>
                </div>
              </div>
              <button className='mt-2 font-semibold underline' onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          </div>
        </>
      ) : (
        <GoogleOAuthProvider clientId={CLIENT_GOOGLE_ID}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                const decoded = jwtDecode(credentialResponse.credential) as AuthGoogleType
                setUser(decoded)
                localStorage.setItem('authGoogle', JSON.stringify(decoded))
                toast.success('Đăng nhập google thành công')
              }
            }}
            onError={() => {
              console.log('Login Failed')
            }}
          />
        </GoogleOAuthProvider>
      )}
    </div>
  )
}

export default AuthGoogle
