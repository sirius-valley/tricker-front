import { Navigate, Outlet } from 'react-router-dom'
import { useCurrentProjectId, useUser } from '@redux/hooks'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import { type UserProjectRole } from '@utils/types'

const RoleValidation = (): JSX.Element => {
  const { showSnackBar } = useSnackBar()
  const user = useUser()
  const currentProjectId = useCurrentProjectId()

  const currentProject: UserProjectRole | undefined =
    user.projectsRoleAssigned.find(
      (project: UserProjectRole) => project.projectId === currentProjectId
    )

  if (currentProject && currentProject.role?.name === 'Project Manager') {
    return <Outlet />
  }
  showSnackBar('You are not authorized to access this page', 'error')
  return <Navigate to="/" replace />
}

export default RoleValidation
