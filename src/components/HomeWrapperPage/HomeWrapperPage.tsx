import NavBar from '@components/NavBar/NavBar'
import { SidebarNav } from '@components/SidebarNav/SidebarNav'
import useScreenSize from '@hooks/useScreenSize'
import { useAppDispatch, useUser } from '@redux/hooks'
import { setCurrentProjectId } from '@redux/user'
import { type UserProjectRole, type DropdownOption } from '@utils/types'
import React, { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const HomeWrapperPage: React.FC = (): JSX.Element => {
  const [userRole, setUserRole] = useState<string>('Developer')
  const [dropdownOptions, setDropdownOptions] = useState<
    Array<{ id: string; title: string; image: string }>
  >([])
  const [selectedProject, setSelectedProject] = useState<DropdownOption>({
    id: '',
    title: '',
    image: ''
  })

  const user = useUser()
  const dispatch = useAppDispatch()
  const screen = useScreenSize()

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
      const dropdownItems = user.projectsRoleAssigned.map(
        (project: UserProjectRole) => ({
          id: project.projectId,
          title: project.project.name,
          image: project.project?.image || ''
        })
      )
      setDropdownOptions(dropdownItems)
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
        preSelectedOption={
          selectedProject.id !== '' ? selectedProject : dropdownOptions[0]
        }
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
