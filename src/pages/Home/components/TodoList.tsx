import { Todos } from '~/types/todo.type'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todos
  isComplete: boolean
}

function TodoList({ todos, isComplete }: TodoListProps) {
  return (
    <ul className='mt-5'>
      {todos.map((todo) => {
        if (todo.completed === isComplete) {
          return <TodoItem todo={todo} key={todo.todo_id} />
        }
      })}
    </ul>
  )
}

export default TodoList
