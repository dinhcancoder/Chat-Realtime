import { Todo } from '~/types/todo.type'
import useMutationDeleteTodo from '../hooks/useMutationDeleteTodo'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import useMutationUpdateTodo from '../hooks/useMutationUpdateTodo'
import { useContext } from 'react'
import { TodoContext } from './Todo'

interface TodoItemProps {
  todo: Todo
}

function TodoItem({ todo }: TodoItemProps) {
  const { completed, description, todo_name } = todo
  const { editTodo } = useContext(TodoContext)
  const deleteTodoMutation = useMutationDeleteTodo()
  const updateTodoMutation = useMutationUpdateTodo()
  const queryClient = useQueryClient()

  const handleDeleteTodo = () => {
    if (window.confirm('Xác nhận xóa todo')) {
      deleteTodoMutation.mutate(todo.todo_id, {
        onSuccess: () => {
          toast.success('Xóa todo thành công!')
          queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
      })
    }
  }

  const handleUpdateCompleted = (todo_id: number | string, value: boolean) => {
    const params = {
      todo_id,
      data: {
        completed: value
      }
    }

    updateTodoMutation.mutate(params, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'], refetchType: 'all' })
        toast.success('Cập nhật todo thành công!')
      }
    })
  }

  return (
    <li className='mt-5 flex items-center justify-between rounded-sm bg-gray-100 px-4 py-2 shadow-md'>
      <div>
        <h3
          className={classNames('text-[17px] font-semibold', {
            'line-through': completed
          })}
        >
          {todo_name}
        </h3>
        <p className='mt-1 text-sm text-gray-600'>{description}</p>
      </div>
      <div className='flex items-center gap-3 text-lg'>
        {completed ? (
          <>
            <i
              className='fa-solid fa-rotate-right cursor-pointer text-blue-600'
              onClick={() => handleUpdateCompleted(todo.todo_id, false)}
            ></i>
            <i className='fa-regular fa-trash-can cursor-pointer text-orange-600' onClick={handleDeleteTodo}></i>
          </>
        ) : (
          <>
            <i
              className='fa-regular fa-pen-to-square cursor-pointer text-blue-500'
              onClick={() => editTodo(todo.todo_id)}
            ></i>
            <i className='fa-regular fa-trash-can cursor-pointer text-orange-600' onClick={handleDeleteTodo}></i>
            <i
              className='fa-solid fa-check cursor-pointer text-green-500'
              onClick={() => handleUpdateCompleted(todo.todo_id, true)}
            ></i>
          </>
        )}
      </div>
    </li>
  )
}

export default TodoItem
