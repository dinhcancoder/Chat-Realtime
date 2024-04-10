export interface Todo {
  todo_id: string
  todo_name: string
  description: string
  user_id: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export type Todos = Todo[]

export type TodoAdd = Pick<Todo, 'todo_name' | 'description'>

export type TodoUpdate = Pick<Todo, 'todo_id' | 'todo_name' | 'description'>

export type TodoSearch = Pick<Todo, 'todo_name' | 'user_id'>
