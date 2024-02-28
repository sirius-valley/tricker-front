import { Outlet, createBrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import NavBar from '@components/NavBar/NavBar'
import { SidebarNav } from '@components/SidebarNav/SidebarNav'
import React from 'react'
// import StepperExample from '@pages/StepperExample'
import EmptyProjectPage from '@pages/Login/EmptyProjectPage'
import WrapperPage from '@components/Wrapper/WrapperPage'
import { TeamMemberManagement } from '@components/TeamMemberManagement/TeamMemberManagement'
import { type User } from '@utils/types'

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
const teamMembers: User[] = [
  { id: '1', username: 'Victoria Capurro' },
  { id: '2', username: 'Fabrizio Serial' },
  { id: '3', username: 'Emilia Martella' },
  { id: '4', username: 'Other Member' },
  { id: '5', username: 'Federico Ariel Martucci' }
]
export const ROUTER = createBrowserRouter([
  {
    path: '/login',
    element: (
      <WrapperPage>
        <TeamMemberManagement
          handleRemainingUsers={() => {}}
          teamMembers={teamMembers}
          projectName="Tricker"
        />
      </WrapperPage>
    )
  },
  {
    path: '/login/non-invited',
    element: <EmptyProjectPage />
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
