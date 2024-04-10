import { useMutation } from '@tanstack/react-query'
import todoApi from '~/services/apis/todo.api'

function useMutationDeleteTodo() {
  return useMutation({
    mutationFn: (todo_id: string | number) => todoApi.deleteTodo(todo_id)
  })
}

export default useMutationDeleteTodo
