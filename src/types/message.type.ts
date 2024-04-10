export interface Message {
  message_id: string
  conversation_id: string
  sender_id: string
  receiver_id: string
  content: string
  createdAt: string
  updatedAt: string
  sender_data: {
    user_id: string
    first_name: string
    last_name: string
  }
  receiver_data: {
    user_id: string
    first_name: string
    last_name: string
  }
}
