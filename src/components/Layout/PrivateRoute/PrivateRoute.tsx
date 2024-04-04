import { useEffect, useState } from 'react'
import PageWrapper from './PrivateRouteWrapper'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@redux/hooks'
import { setUser } from '@redux/user'
import { useGetOrCreateUser } from '@data-provider/query'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'

const PrivateRoute = (): JSX.Element => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { showSnackBar } = useSnackBar()

  const { data, isLoading, error } = useGetOrCreateUser()
  data && dispatch(setUser(data))

  useEffect(() => {
    if (error) {
      navigate('/login')
      setIsAuthorized(false)
      showSnackBar('You are not authorized to access this page', 'error')
      console.error(error)
    }
  }, [error, navigate, showSnackBar])

  useEffect(() => {
    try {
      if (data) {
        if (data?.id !== '') {
          dispatch(setUser(data))
          if (data.projectsRoleAssigned?.length === 0) {
            navigate('/login/role')
          } else {
            setIsAuthorized(true)
          }
        }
      }
    } catch (e) {
      console.error(e, error)
      setIsAuthorized(false)
      navigate('/login')
    }
    if (data && data.id !== '' && data.projectsRoleAssigned.length !== 0) {
      setIsAuthorized(true)
    }
  }, [navigate, error, showSnackBar, data, dispatch])

  return data && data.id === '' ? (
    <Navigate to="/login" replace />
  ) : data?.projectsRoleAssigned.length === 0 ? (
    <Navigate to="/login/role" replace />
  ) : (
    <PageWrapper isLoading={isLoading} isAuthorized={isAuthorized} />
  )
}

export default PrivateRoute
