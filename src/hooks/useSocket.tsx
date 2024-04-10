import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const DEFAULT_SERVER_URL = 'http://localhost:3000'

const useSocket = (user_id?: string): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null)
  useEffect(() => {
    let newSocket: Socket
    if (user_id) {
      newSocket = io(DEFAULT_SERVER_URL, {
        query: {
          user_id
        }
      })
    } else {
      newSocket = io(DEFAULT_SERVER_URL)
    }

    newSocket.on('connect_error', () => {
      console.error('Không thể kết nối đến máy chủ!')
      newSocket.disconnect()
      setSocket(null)
    })

    newSocket.on('disconnect', () => {
      console.log('Mất kết nối đến máy chủ')
      setSocket(null)
    })

    setSocket(newSocket)

    return () => {
      if (newSocket.connected) {
        newSocket.disconnect()
      }
    }
  }, [])

  return socket
}

export default useSocket
