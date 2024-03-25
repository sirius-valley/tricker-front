import { createBrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import EmptyProjectPage from '@pages/Login/EmptyProjectPage'
import RoleSelectPage from '@pages/Login/RoleSelectPage'
import SetupPage from '@pages/InitialIntegration/InitialIntegrationPage'
import LoadingPage from '@pages/Loader/LoadingPage'
import HomeWrapperPage from '@components/HomeWrapperPage/HomeWrapperPage'
import LoginPage from '@pages/Login/LoginPage'
import RoleValidation from './RoleValidation/RoleValidation'
import TicketsSection from '@components/TicketsSection/TicketsSection'
import LoginFlowValidation from './LoginFlowValidation/LoginFlowValidation'

export const ROUTER = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    element: <LoginFlowValidation />,
    children: [
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
      }
    ]
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <HomeWrapperPage />,
        children: [
          {
            element: <RoleValidation />,
            children: [
              {
                path: '/projects',
                element: <></>
              },
              {
                path: '/my-team',
                element: <></>
              }
            ]
          },
          {
            path: '/stats',
            element: <></>
          },
          {
            path: '/',
            element: <TicketsSection />
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
