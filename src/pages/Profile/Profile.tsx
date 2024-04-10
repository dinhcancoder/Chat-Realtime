import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '~/contexts/app.context'
import UserApi from '~/services/apis/user.api'
import { User } from '~/types/user.type'

function Profile() {
  const { profile } = useContext(AppContext)
  const [userProfile, setUserProfile] = useState<User>(profile as User)
  const { id: user_id = '' } = useParams<{ id: string }>()

  useEffect(() => {
    if (profile?.user_id !== user_id) {
      const getUserByID = async () => {
        const data = await UserApi.getUserByID(user_id)
        setUserProfile(data.data.data.user)
      }
      getUserByID()
    } else {
      setUserProfile(profile)
    }
  }, [user_id])

  return (
    <div className=' dark:bg-dark2 border bg-white shadow lg:rounded-b-2xl'>
      <div className='relative h-48 w-full overflow-hidden rounded-md lg:h-72'>
        <img
          src='https://i.ebayimg.com/images/g/zV4AAOSwIMJkSA-e/s-l1200.webp'
          alt=''
          className='inset-0 h-full w-full object-cover'
        />
        <div className='absolute bottom-0 left-0 z-10 w-full bg-gradient-to-t from-black/60 pt-20' />
        <div className='absolute bottom-0 right-0 z-20 m-4'>
          <div className='flex items-center gap-3'>
            <button className='button backdrop-blur-small flex items-center gap-2 rounded-md bg-black/20 px-5 py-[6px] text-white'>
              Chỉnh sửa
            </button>
            <button className='button backdrop-blur-small flex items-center gap-2 rounded-md bg-white/20 px-5 py-[6px] text-white'>
              Xóa
            </button>
          </div>
        </div>
      </div>
      {/* user info */}
      <div className='p-3'>
        <div className='-mt-28 flex flex-col justify-center md:items-center lg:-mt-48'>
          <div className='relative z-10 mb-4 h-28 w-28 lg:h-48 lg:w-48'>
            <div className='relative shrink-0 overflow-hidden rounded-full border-gray-100 shadow md:border-[6px] dark:border-slate-900'>
              <img src={userProfile?.avatar} alt='' className='inset-0 h-full w-full object-cover' />
            </div>
            <button
              type='button'
              className='absolute -bottom-3 left-1/2 hidden -translate-x-1/2 rounded-full bg-white p-1.5 shadow sm:flex'
            >
              <i className='fa-solid fa-camera w-8 object-contain text-xl'></i>
            </button>
          </div>
          <h3 className='text-base font-bold text-black md:text-3xl dark:text-white'>
            {userProfile?.first_name} {userProfile?.last_name}
          </h3>
          <p className='mt-2 max-w-[65%] text-center text-gray-500 dark:text-white/80'>
            Tôi yêu cái đẹp và cảm xúc. Tôi đam mê nhiếp ảnh và học hỏi. 📚 Tôi khám phá các thể loại và phong cách. 🌈
            Tôi nghĩ nhiếp ảnh là kể chuyện. 😊
          </p>
        </div>
      </div>
      <div className='flex items-center justify-between px-2'>
        <nav className='-mb-px flex gap-0.5 rounded-xl text-[15px] font-medium text-gray-600  max-md:w-full max-md:overflow-x-auto dark:text-white'>
          <a href='#!' className='inline-block  border-b-2 border-blue-600 px-3.5 py-3 leading-8 text-blue-600'>
            Trang cá nhân
          </a>
          <a href='#!' className='inline-block px-3.5 py-3 leading-8'>
            Bạn bè <span className='hidden pl-2 text-xs font-normal lg:inline-block'>2,680</span>
          </a>
          <a href='#!' className='inline-block px-3.5 py-3 leading-8'>
            Hình ảnh
          </a>
          <a href='#!' className='inline-block px-3.5 py-3 leading-8'>
            Video
          </a>
          <a href='#!' className='inline-block px-3.5 py-3 leading-8'>
            Nhóm
          </a>
          <a href='#!' className='inline-block px-3.5 py-3 leading-8'>
            Khác
          </a>
        </nav>
        <div className='flex items-center gap-2 py-2 pr-1 text-sm max-md:w-full lg:order-2'>
          <button className='button flex items-center gap-2 rounded-[5px] bg-[#4a6cf7] px-4 py-[6px] text-white max-md:flex-1'>
            <i className='fa-solid fa-circle-plus text-lg'></i>
            <span className='text-sm'> Add Your Story</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
