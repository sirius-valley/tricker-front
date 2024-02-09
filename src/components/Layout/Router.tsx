import LoginPage from '@pages/Login/LoginPage'
import { createBrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

export const ROUTER = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/'
        // element: <HomePage />,
      }
    ]
  }
])
