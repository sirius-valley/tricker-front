import { createBrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import EmptyProjectPage from '@pages/Login/EmptyProjectPage'
import RoleSelectPage from '@pages/Login/RoleSelectPage'
// import LoginPage from '@pages/Login/LoginPage'
import SetupPage from '@pages/InitialIntegration/InitialIntegrationPage'
import LoadingPage from '@pages/Loader/LoadingPage'
import FilterSection from '@components/FilterSection/FilterSection'
import HomeWrapperPage from '@components/HomeWrapperPage/HomeWrapperPage'

export const ROUTER = createBrowserRouter([
  {
    path: '/login',
    element: (
      <div className="h-screen w-screen bg-gray-700">
        <FilterSection
          handleSelect={function (): void {}}
          handleSearch={function (): void {}}
          handleView={function (view: 'grid' | 'list'): void {
            console.log(view)
          }}
        />
      </div>
    ) // StepperExample
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
    element: <PrivateRoute />,
    children: [
      {
        element: <HomeWrapperPage />,
        children: [
          {
            path: '/',
            element: <></>
          }
        ]
      }
    ]
  }
])
