import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Header from '~/components/Header'
import useSocket from '~/hooks/useSocket'

interface Props {
  children: React.ReactNode
}

function MainLayout({ children }: Props) {
  const socket = useSocket()

  useEffect(() => {
    if (socket) {
      socket.on('activity_notification', (data) => toast.success(data.data))
    }
  }, [socket])

  return (
    <>
      <Header />
      <div className='mx-auto max-w-7xl lg:px-8'>{children}</div>
    </>
  )
}

export default MainLayout
