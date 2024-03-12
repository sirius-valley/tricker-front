import { useGetUserRole } from '@data-provider/query'
import { useAppDispatch, useUser } from '@redux/hooks'
import { setCurrentProjectId } from '@redux/user'
import { type UserProjectRole } from '@utils/types'
import { useEffect, useState } from 'react'

const useValidateRole = (
  selectedProjectId: string
): {
  dropdownOptions: Array<{ id: string; title: string; image: string }>
  userRole: string
} => {
  const [userRole, setUserRole] = useState<string>('Developer')
  const [dropdownOptions, setDropdownOptions] = useState<
    Array<{ id: string; title: string; image: string }>
  >([])
  const user = useUser()
  const dispatch = useAppDispatch()

  const userProjectRole = user.projectsRoleAssigned.find(
    (userProjectRole: UserProjectRole) =>
      userProjectRole.projectId === selectedProjectId
  )
  const { data } = useGetUserRole(
    userProjectRole ? userProjectRole.id : user.projectsRoleAssigned[0].id
  )
  data ? setUserRole(data) : setUserRole('Developer')

  useEffect(() => {
    const setUserProjects = (): void => {
      dispatch(
        setCurrentProjectId(
          selectedProjectId || user.projectsRoleAssigned[0].projectId
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
  })

  return { dropdownOptions, userRole }
}

export default useValidateRole
