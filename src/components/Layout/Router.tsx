import { Outlet, createBrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import NavBar from '@components/NavBar/NavBar'
import { SidebarNav } from '@components/SidebarNav/SidebarNav'
import EmptyProjectPage from '@pages/Login/EmptyProjectPage'
import RoleSelectPage from '@pages/Login/RoleSelectPage'
import LoginPage from '@pages/Login/LoginPage'
import SetupPage from '@pages/InitialIntegration/InitialIntegrationPage'
import useScreenSize from '@hooks/useScreenSize'
import LoadingPage from '@pages/Loader/LoadingPage'

const WithNav = (): JSX.Element => {
  const screenSize = useScreenSize()

  return (
    <div>
      {screenSize.width < 768 ? (
        <NavBar isProjectManager />
      ) : (
        <SidebarNav
          variant={'pm'}
          dropdownOptions={[]}
          handleDropdownSelect={function (): void {}}
        />
      )}
      <Outlet />
    </div>
  )
}

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
    element: <PrivateRoute />,
    children: [
      {
        element: <WithNav />,
        children: [
          {
            path: '/',
            // element: <HomePage />,
            element: <></>
          }
        ]
      }
    ]
  }
])
