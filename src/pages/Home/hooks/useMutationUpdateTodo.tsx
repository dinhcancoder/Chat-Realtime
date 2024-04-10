import { useMutation } from '@tanstack/react-query'
import todoApi from '~/services/apis/todo.api'

function useMutationUpdateTodo() {
  return useMutation({
    mutationFn: (params: {
      todo_id: string | number
      data: { todo_name?: string; description?: string; completed?: boolean }
    }) => {
      const { todo_id, data } = params
      return todoApi.updateTodo(todo_id, data)
    }
  })
}

export default useMutationUpdateTodo
