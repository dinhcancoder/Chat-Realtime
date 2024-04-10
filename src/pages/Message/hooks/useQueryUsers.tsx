import { useQuery } from '@tanstack/react-query'
import UserApi from '~/services/apis/user.api'

function useQueryUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => UserApi.getAllUsers()
  })
}

export default useQueryUsers
