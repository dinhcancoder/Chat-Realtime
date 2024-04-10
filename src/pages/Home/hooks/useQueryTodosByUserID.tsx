import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AppContext } from '~/contexts/app.context'
import todoApi from '~/services/apis/todo.api'

function useQueryTodosByUserID() {
  const { profile } = useContext(AppContext)
  const user_id = profile?.user_id ?? ''

  return useQuery({
    queryKey: ['todos', { user_id }],
    queryFn: () => todoApi.fetchAllTodos(user_id)
  })
}

export default useQueryTodosByUserID
