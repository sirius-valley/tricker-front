// import LoginPage from '@pages/Login/LoginPage'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import NavBar from '@components/NavBar/NavBar'
import { SidebarNav } from '@components/SidebarNav/SidebarNav'
import React from 'react'
import StepperExample from '@pages/StepperExample'

const WithNav = (): JSX.Element => {
  const [isMobile, setIsMobile] = React.useState<boolean>(
    window.screen.width < 768
  )

  React.useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.screen.width < 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div>
      {isMobile ? (
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
    element: <StepperExample />
  },
  {
    element: <WithNav />,
    children: [
      {
        element: <PrivateRoute />,
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
