import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from '~/contexts/app.context'
import MainLayout from '~/layouts/MainLayout'
import AuthGoogle from '~/pages/AuthGoogle'
import ChatRealtime from '~/pages/ChatRealtime'
import Home from '~/pages/Home'
import Login from '~/pages/Login'
import Message from '~/pages/Message'
import Profile from '~/pages/Profile'
import Refresh from '~/pages/Refresh'
import Register from '~/pages/Register'
import SearchImage from '~/pages/SearchImage'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={'/'} />
}

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: (
            <MainLayout>
              <Home />
            </MainLayout>
          )
        },
        {
          path: '/message',
          element: (
            <MainLayout>
              <Message />
            </MainLayout>
          )
        },
        {
          path: '/profile/:id',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        },
        {
          path: '/image',
          element: (
            <MainLayout>
              <SearchImage />
            </MainLayout>
          )
        },
        {
          path: '/refresh',
          element: (
            <MainLayout>
              <Refresh />
            </MainLayout>
          )
        },
        {
          path: '/auth-google',
          element: (
            <MainLayout>
              <AuthGoogle />
            </MainLayout>
          )
        },
        {
          path: '/chat-realtime',
          element: (
            <MainLayout>
              <ChatRealtime />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        }
      ]
    }
  ])

  return routeElements
}

export default useRouteElements
