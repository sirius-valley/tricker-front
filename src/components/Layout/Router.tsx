import { createBrowserRouter } from 'react-router-dom'
// import PrivateRoute from './PrivateRoute/PrivateRoute'
import EmptyProjectPage from '@pages/Login/EmptyProjectPage'
import RoleSelectPage from '@pages/Login/RoleSelectPage'
import SetupPage from '@pages/InitialIntegration/InitialIntegrationPage'
import LoadingPage from '@pages/Loader/LoadingPage'
import HomeWrapperPage from '@components/HomeWrapperPage/HomeWrapperPage'
import LoginPage from '@pages/Login/LoginPage'

export const ROUTER = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage /> // StepperExample
  },
  {
    path: '/login/non-invited',
    element: <EmptyProjectPage />
  },
  {
    path: '/login/role',
    element: <RoleSelectPage />
  },
  {
    path: '/setup',
    element: <SetupPage />
  },
  {
    path: '/setup/loader',
    element: <LoadingPage />
  },
  {
    children: [
      {
        element: <HomeWrapperPage />,
        children: [
          {
            path: '/projects',
            element: <></>
          },
          {
            path: '/stats',
            element: <></>
          },
          {
            path: '/',
            element: <></>
          },
          {
            path: '/my-team',
            element: <></>
          },
          {
            path: '/profile',
            element: <></>
          }
        ]
      }
    ]
  }
])
