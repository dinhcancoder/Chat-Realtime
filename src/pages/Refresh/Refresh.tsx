import { useQuery } from '@tanstack/react-query'
import authApi from '~/services/apis/auth.api'
import UserApi from '~/services/apis/user.api'

function Refresh() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: UserApi.getAllUsers
  })

  // if (isLoading) return <div>Loading ...</div>
  // if (error) return <div>Error: {error.message}</div>

  const handleFetchAllUsers = () => {
    console.log(data?.data.data.users)
  }

  const handleRefreshAccessToken = async () => {
    const res = await authApi.refreshToken()
    console.log(res.data.data)
  }

  return (
    <>
      <button onClick={handleFetchAllUsers} className='mx-2 rounded-md bg-blue-600 px-5 py-2 text-white'>
        List Users
      </button>
      <button onClick={handleRefreshAccessToken} className='mx-2 rounded-md bg-green-600 px-5 py-2 text-white'>
        Refresh Token
      </button>
    </>
  )
}

export default Refresh
