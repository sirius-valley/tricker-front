import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUserRole } from '@redux/hooks'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import LoadingPage from '@pages/Loader/LoadingPage'

const RoleValidation = (): JSX.Element => {
  const { showSnackBar } = useSnackBar()
  const userRole = useUserRole()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (userRole !== '') {
      setIsLoading(false)
    }
  }, [userRole])

  if (isLoading) {
    return <LoadingPage />
  }

  if (userRole !== 'Project Manager') {
    showSnackBar('You are not authorized to access this page', 'error')
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default RoleValidation
