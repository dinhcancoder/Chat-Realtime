import { TodoAdd, TodoUpdate } from '~/types/todo.type'
import { createContext, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TodoSearchType, TodoType, todoSchema, todoSeachSchema } from '~/utils/rules'
import useMutationAddTodo from '../hooks/useMutationAddTodo'
import { toast } from 'react-toastify'
import useQueryTodosByUserID from '../hooks/useQueryTodosByUserID'
import Loading from '~/components/Loading/Loading'
import { useQueryClient } from '@tanstack/react-query'
import TodoList from './TodoList'
import useMutationUpdateTodo from '../hooks/useMutationUpdateTodo'
import classNames from 'classnames'
import useMutationSearchTodos from '../hooks/useMutationSearchTodo'
import { AppContext } from '~/contexts/app.context'

interface ITodoContext {
  editTodo: (todo_id: number | string) => void
  currentTodo: TodoAdd | null
}

const initialTodoContext: ITodoContext = {
  editTodo: () => null,
  currentTodo: null
}

export const TodoContext = createContext<ITodoContext>(initialTodoContext)

function Todo() {
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [currentTodo, setCurrentTodo] = useState<TodoUpdate | null>(null)
  const { profile } = useContext(AppContext)

  const todoQuery = useQueryTodosByUserID()
  const addTodoMutation = useMutationAddTodo()
  const updateTodoMutation = useMutationUpdateTodo()
  const searchTodoMutation = useMutationSearchTodos()
  const queryClient = useQueryClient()

  const user_id = profile?.user_id ?? ''

  const todos = (todoQuery.data && todoQuery.data.data.data.todos) ?? []

  // Quản lý form thêm mới todo
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<TodoType>({
    resolver: yupResolver(todoSchema)
  })

  // Quản lý form tìm kiếm todo
  const todoSearchForm = useForm<TodoSearchType>({
    resolver: yupResolver(todoSeachSchema)
  })

  // Thêm mới todo
  const handleAddTodo = handleSubmit((data: TodoAdd) => {
    const dataTodo = { ...data, user_id }

    if (currentTodo) {
      const params = {
        todo_id: currentTodo.todo_id,
        data: dataTodo
      }

      updateTodoMutation.mutate(params, {
        onSuccess: () => {
          toast.success('Cập nhật thành công!')
          queryClient.invalidateQueries({ queryKey: ['todos'] })
          reset()
          setCurrentTodo(null)
        }
      })
    } else {
      addTodoMutation.mutate(dataTodo, {
        onSuccess: () => {
          toast.success('Thêm todo thành công!')
          queryClient.invalidateQueries({ queryKey: ['todos', { user_id }] })
          reset()
        }
      })
    }
  })

  // Tìm kiếm todo
  const handleSearchTodo = todoSearchForm.handleSubmit((data) => {
    const dataWithUserID = { ...data, user_id }

    searchTodoMutation.mutate(dataWithUserID, {
      onSuccess: (data) => {
        const todos = data.data.data.todos

        if (todos.length === 0) {
          toast.warn('Không tìm thấy todo nào!')
        } else if (todos.length !== 0) {
          let foundTodo = false

          todos.forEach((todo) => {
            if (todo.completed === isComplete) {
              foundTodo = true
            }
          })

          if (!foundTodo) {
            toast.warn('Không tìm thấy todo nào!')
          } else {
            toast.success('Tìm kiếm thành công.')
          }
        } else {
          toast.success('Tìm kiếm thành công.')
        }
        queryClient.setQueryData(['todos', { user_id }], data)
      }
    })
  })

  // Cập nhật todo
  const editTodo = (todo_id: number | string) => {
    const todo = todos.find((todo) => todo.todo_id === todo_id)

    if (todo) {
      setCurrentTodo(todo)
      setValue('todo_name', todo.todo_name)
      setValue('description', todo.description)
    }
  }

  // Loading siêu nhân
  if (todoQuery.isLoading) return <Loading />

  return (
    <div>
      <h1 className='mt-8 text-center text-3xl font-bold text-blue-500'>
        My Todo List <i className='fa-solid fa-book ml-2'></i>
      </h1>
      {/* Form */}
      <form onSubmit={handleAddTodo} className='mt-8 flex w-[700px] items-start gap-3'>
        <div className='flex-1'>
          <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>Tiêu đề</label>
          <input
            type='text'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Tiêu đề việc cần làm ...'
            {...register('todo_name')}
          />
          <span className='mt-1 block text-sm text-red-500'>{errors.todo_name?.message}</span>
        </div>
        <div className='flex-1'>
          <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>Nội dung</label>
          <input
            type='text'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Nội dung thực hiện ...'
            {...register('description')}
          />
          <span className='mt-1 block text-sm text-red-500'>{errors.description?.message}</span>
        </div>
        <button className='mt-7 h-[45.6px] rounded-lg bg-blue-700 px-4 text-white'>
          {currentTodo ? 'Cập nhật' : 'Thêm mới'}
        </button>
      </form>
      <div className='mt-5 flex gap-2'>
        <button
          onClick={() => setIsComplete(false)}
          className={classNames('flex items-center gap-2 rounded-md bg-gray-300 px-4 py-2 opacity-50', {
            'font-semibold opacity-95': !isComplete
          })}
        >
          Chưa hoàn thành <i className='fa-regular fa-circle-xmark text-lg'></i>
        </button>
        <button
          onClick={() => setIsComplete(true)}
          className={classNames('flex items-center gap-2 rounded-md bg-green-400 px-4 py-2 text-black opacity-50', {
            'font-semibold opacity-95': isComplete
          })}
        >
          Hoàn thành <i className='fa-regular fa-circle-check text-lg'></i>
        </button>
        <div className='h-[45.6px]  flex-1'>
          <form onSubmit={handleSearchTodo}>
            <label htmlFor='default-search' className='sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Search
            </label>
            <div className='relative'>
              <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
                <svg
                  className='h-4 w-4 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
              </div>
              <input
                type='search'
                id='default-search'
                className='block h-[45.6px] w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                placeholder='Tìm kiếm công việc ...'
                {...todoSearchForm.register('todo_name')}
              />
              <button
                type='submit'
                className='absolute bottom-[5px] end-1.5 rounded-lg bg-blue-700 px-4 py-[8px] text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Tìm kiếm
              </button>
            </div>
          </form>
        </div>
      </div>
      <span className='ml-[345px] mt-2 block text-sm text-red-500'>
        {todoSearchForm.formState.errors.todo_name?.message}
      </span>

      {/* List Todo */}
      <TodoContext.Provider value={{ editTodo, currentTodo }}>
        <TodoList todos={todos} isComplete={isComplete} />
      </TodoContext.Provider>
    </div>
  )
}

export default Todo
