import * as yup from 'yup'

const authSchema = yup.object({
  email: yup.string().required('Vui lòng nhập email!').email('Email này không hợp lệ'),
  password: yup.string().required('Vui lòng nhập mật khẩu!')
})

export const todoSchema = yup.object({
  todo_name: yup.string().required('Tiêu đề không được để trống!').min(6, 'Độ dài tối thiểu 6 kí tự!'),
  description: yup.string().required('Nội dung không được để trống!').min(6, 'Độ dài tối thiểu 6 kí tự!')
})

export const todoSearchSchema = yup.object({
  todo_name: yup.string().required('Nhập công việc cần tìm kiếm!')
})

export const loginSchema = authSchema

export const todoSeachSchema = todoSearchSchema

export type LoginType = yup.InferType<typeof loginSchema>
export type TodoType = yup.InferType<typeof todoSchema>
export type TodoSearchType = yup.InferType<typeof todoSeachSchema>
