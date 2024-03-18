import NavBar from '@components/NavBar/NavBar'
import { SidebarNav } from '@components/SidebarNav/SidebarNav'
import useScreenSize from '@hooks/useScreenSize'
import { useAppDispatch, useCurrentProjectId, useUser } from '@redux/hooks'
import { setCurrentProjectId } from '@redux/user'
import { type UserProjectRole, type DropdownOption } from '@utils/types'
import React, { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const HomeWrapperPage: React.FC = (): JSX.Element => {
  const user = useUser()
  const dispatch = useAppDispatch()
  const screen = useScreenSize()
  const currentProjectId = useCurrentProjectId()
  const dropdownOptions = user.projectsRoleAssigned.map(
    (project: UserProjectRole) => ({
      id: project.projectId,
      title: project.project.name,
      image: project.project.image || ''
    })
  )
  const currentProject = dropdownOptions.find(
    (option: DropdownOption) => option.id === currentProjectId
  )

  const [userRole, setUserRole] = useState<string>('Developer')
  const [selectedProject, setSelectedProject] = useState<DropdownOption>(
    currentProject || dropdownOptions[0]
  )

  useEffect(() => {
    const userProjectRole = user.projectsRoleAssigned.find(
      (userProjectRole: UserProjectRole) =>
        userProjectRole.projectId === selectedProject.id
    )
    setUserRole(userProjectRole?.role?.name || 'Developer')
  }, [selectedProject, user.projectsRoleAssigned])

  useEffect(() => {
    const setUserProjects = (): void => {
      dispatch(
        setCurrentProjectId(
          selectedProject.id !== ''
            ? selectedProject.id
            : user.projectsRoleAssigned[0].projectId
        )
      )
    }
    setUserProjects()
  }, [selectedProject, user.projectsRoleAssigned, dispatch])

  const handleDropdownSelect = useCallback(
    (selectedProject: DropdownOption): void => {
      setSelectedProject(selectedProject)
    },
    []
  )

  return screen.width >= 768 ? (
    <div className="bg-gray-500 h-screen w-screen flex items-center justify-center">
      <SidebarNav
        preSelectedOption={selectedProject}
        variant={userRole}
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
      <NavBar isProjectManager={userRole === 'Project Manager'} />
      <div className="w-full h-full flex-1 flex items-center justify-center bg-gray-700 pb-[70px]">
        <div className="w-full h-full bg-gray-500">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default HomeWrapperPage
