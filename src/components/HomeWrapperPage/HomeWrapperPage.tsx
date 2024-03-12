import NavBar from '@components/NavBar/NavBar'
import { SidebarNav } from '@components/SidebarNav/SidebarNav'
import useScreenSize from '@hooks/useScreenSize'
import { useUser } from '@redux/hooks'
import { type UserProjectRole } from '@utils/types'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

const HomeWrapperPage: React.FC = (): JSX.Element => {
  const [dropdownOptions, setDropdownOptions] = useState<
    Array<{ title: string; image: string }>
  >([])
  const user = useUser()
  if (user.projectsRoleAssigned) {
    const dropdownItems = user.projectsRoleAssigned.map(
      (project: UserProjectRole) => ({
        title: project.project.name,
        image: project.project?.image || ''
      })
    )
    setDropdownOptions(dropdownItems)
  }
  const screen = useScreenSize()
  return screen.width >= 768 ? (
    <div className="bg-gray-500 h-screen w-screen flex items-center justify-center">
      <SidebarNav
        variant={'pm'}
        dropdownOptions={dropdownOptions}
        handleDropdownSelect={function (): void {}}
      />
      <div className="w-full h-full flex-1 flex items-center justify-center bg-gray-700 py-[70px] px-12">
        <div className="w-full h-full bg-gray-500 rounded-xl border border-white/10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-gray-500 h-screen w-screen flex items-center justify-center">
      <NavBar />
      <div className="w-full h-full flex-1 flex items-center justify-center bg-gray-700 pb-[70px]">
        <div className="w-full h-full bg-gray-500">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default HomeWrapperPage
