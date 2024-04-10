import { SuccessResponse } from '~/types/response.type'
import { Todos, TodoAdd, Todo, TodoSearch } from '~/types/todo.type'
import http from '~/utils/http'

type TodosResponse = SuccessResponse<{
  todos: Todos
}>

type TodoResponse = SuccessResponse<{
  todo: Todo
}>

type TodoSearchResponse = SuccessResponse<{
  todos: Todo[]
}>

const todoApi = {
  fetchAllTodos(user_id: string) {
    return http.get<TodosResponse>(`todo/list/${user_id}`)
  },

  addNewTodo(todo: TodoAdd) {
    return http.post<TodoResponse>('todo/add', todo)
  },

  deleteTodo(todo_id: string | number) {
    return http.delete<TodoResponse>(`todo/delete/${todo_id}`)
  },

  updateTodo(todo_id: string | number, data: { completed?: boolean }) {
    return http.put<TodoResponse>(`todo/update/${todo_id}`, data)
  },

  searchTodo(data: TodoSearch) {
    return http.post<TodoSearchResponse>('todo/search', data)
  }
}

export default todoApi
