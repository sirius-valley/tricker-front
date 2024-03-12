import NavBar from '@components/NavBar/NavBar'
import { SidebarNav } from '@components/SidebarNav/SidebarNav'
import useScreenSize from '@hooks/useScreenSize'
import { useAppDispatch, useUser } from '@redux/hooks'
import { setCurrentProjectId } from '@redux/user'
import { type UserProjectRole } from '@utils/types'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const HomeWrapperPage: React.FC = (): JSX.Element => {
  const [dropdownOptions, setDropdownOptions] = useState<
    Array<{ title: string; image: string }>
  >([])
  const user = useUser()
  const dispatch = useAppDispatch()
  useEffect(() => {
    const setUserProjects = (): void => {
      if (user.projectsRoleAssigned) {
        dispatch(setCurrentProjectId(user.projectsRoleAssigned[0].projectId))
        const dropdownItems = user.projectsRoleAssigned.map(
          (project: UserProjectRole) => ({
            id: project.projectId,
            title: project.project.name,
            image: project.project?.image || ''
          })
        )
        setDropdownOptions(dropdownItems)
      }
    }
    setUserProjects()
  })
  const handleDropdownSelect = (selectedProjectId: string): void => {
    dispatch(setCurrentProjectId(selectedProjectId))
  }
  const screen = useScreenSize()
  return screen.width >= 768 ? (
    <div className="bg-gray-500 h-screen w-screen flex items-center justify-center">
      <SidebarNav
        variant={'pm'}
        dropdownOptions={dropdownOptions}
        handleDropdownSelect={handleDropdownSelect}
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
