import { useMutation } from '@tanstack/react-query'
import todoApi from '~/services/apis/todo.api'
import { TodoAdd } from '~/types/todo.type'

interface TodoAddWithUserId extends TodoAdd {
  user_id: string
}

function useMutationAddTodo() {
  return useMutation({
    mutationFn: (data: TodoAddWithUserId) => todoApi.addNewTodo(data)
  })
}

export default useMutationAddTodo
