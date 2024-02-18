import LoginPage from '@pages/Login/LoginPage'
import { createBrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import TimeTrackingBadge from '@components/TimeTrackingBadge/TimeTrackingBadge'

export const ROUTER = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <TimeTrackingBadge ticketId={'TRI-000'} />
      }
    ]
  }
])
