import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import authApi from '~/services/apis/auth.api'
import { UnprocessableEntityError } from '~/types/response.type'
import { isAxiosError } from '~/utils/helpers'
import { LoginType, loginSchema } from '~/utils/rules'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AppContext } from '~/contexts/app.context'
import { io } from 'socket.io-client'

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginType>({
    resolver: yupResolver(loginSchema)
  })
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const loginMutation = useMutation({
    mutationFn: (data: LoginType) => authApi.login(data)
  })

  const handleLogin = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        const user = data.data.data.user
        setIsAuthenticated(true)
        setProfile(user)
        toast.success('Đăng nhập thành công')
        const socket = io('http://localhost:3000', {
          query: {
            user_id: user.user_id
          }
        })
        if (socket) {
          socket.emit('user_login')
        }
      },
      onError: (err) => {
        if (isAxiosError<UnprocessableEntityError>(err) && err.response) {
          const { error } = err.response.data
          Object.keys(error).forEach((key) => {
            setError(key as keyof LoginType, {
              message: error[key as keyof LoginType],
              type: 'server'
            })
          })
        }
      }
    })
  })

  return (
    <>
      {/* component */}
      <link
        rel='stylesheet'
        href='https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/motion-tailwind/motion-tailwind.css'
      />
      <div className='container mx-auto my-5 flex flex-col rounded-lg bg-white pt-12'>
        <div className='draggable my-auto flex h-full w-full justify-center md:gap-5 lg:justify-normal xl:gap-14'>
          <div className='flex w-full items-center justify-center '>
            <div className='flex items-center xl:p-10'>
              <form
                onSubmit={handleLogin}
                className='flex h-full w-full flex-col rounded-3xl bg-white pb-6 text-center'
                noValidate
              >
                <h3 className='text-dark-grey-900 mb-3 text-4xl font-extrabold'>Đăng nhập</h3>
                <p className='text-grey-700 mb-4'>Nhập email và password của bạn</p>
                <a className='text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-grey-300 mb-6 flex w-full cursor-pointer items-center justify-center rounded-2xl py-4 text-sm font-medium transition duration-300 focus:ring-4'>
                  <img
                    className='mr-2 h-5'
                    src='https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png'
                    alt=''
                  />
                  Đăng nhập tài khoản google
                </a>
                <div className='mb-3 flex items-center'>
                  <hr className='border-grey-500 h-0 grow border-b border-solid' />
                  <p className='text-grey-600 mx-4'>or</p>
                  <hr className='border-grey-500 h-0 grow border-b border-solid' />
                </div>
                <div className='mb-7'>
                  <div>
                    <label htmlFor='email' className='text-grey-900 mb-2 block text-start text-start text-sm'>
                      Email*
                    </label>
                    <input
                      id='email'
                      type='email'
                      placeholder='mail@loopple.com'
                      className='focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 mr-2 flex w-full items-center rounded-2xl px-5 py-4 text-sm font-medium outline-none'
                      {...register('email')}
                    />
                  </div>
                  <span className='mt-2 block text-start text-sm text-red-600'>{errors.email?.message}</span>
                </div>
                <div className='mb-7'>
                  <div>
                    <label htmlFor='password' className='text-grey-900 mb-2 block text-start text-start text-sm'>
                      Password*
                    </label>
                    <input
                      id='password'
                      type='password'
                      placeholder='Enter a password'
                      className='focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 mb-5 mr-2 flex w-full items-center rounded-2xl px-5 py-4 text-sm font-medium outline-none'
                      {...register('password')}
                    />
                  </div>
                  <span className='mt-2 block text-start text-sm text-red-600'>{errors.password?.message}</span>
                </div>
                <div className='mb-8 flex flex-row justify-between'>
                  <label className='relative mr-3 inline-flex cursor-pointer select-none items-center'>
                    <input type='checkbox' className='peer sr-only' defaultChecked />
                    <div className='border-grey-500 peer-checked:bg-purple-blue-500 peer h-5 w-5 rounded-sm border-2 bg-white peer-checked:border-0'>
                      <img
                        className=''
                        src='https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png'
                        alt='tick'
                      />
                    </div>
                    <span className='text-grey-900 ml-3 text-sm font-normal'>Nhớ mật khẩu</span>
                  </label>
                  <a href='#!' className='text-purple-blue-500 mr-4 text-sm font-medium'>
                    Quên mật khẩu ?
                  </a>
                </div>
                <button className='hover:bg-purple-blue-600 focus:ring-purple-blue-100 bg-purple-blue-500 mb-5 w-full rounded-2xl px-6 py-5 text-sm font-bold leading-none text-white transition duration-300 focus:ring-4 md:w-96'>
                  Đăng nhập
                </button>
                <p className='text-grey-900 text-sm leading-relaxed'>
                  Bạn chưa có tài khoản ?
                  <a href='#!' className='text-grey-700 font-bold'>
                    Tạo tài khoản
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
