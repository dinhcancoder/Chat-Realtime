import { useMutation } from '@tanstack/react-query'
import todoApi from '~/services/apis/todo.api'
import { TodoSearch } from '~/types/todo.type'

function useMutationSearchTodos() {
  return useMutation({
    mutationFn: (data: TodoSearch) => todoApi.searchTodo(data)
  })
}

export default useMutationSearchTodos
