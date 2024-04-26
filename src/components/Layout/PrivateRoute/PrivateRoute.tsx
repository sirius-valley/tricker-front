import { useEffect, useState } from 'react'
import PageWrapper from './PrivateRouteWrapper'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch } from '@redux/hooks'
import { setUser, setReceivedProjectId } from '@redux/user'
import { useGetOrCreateUser } from '@data-provider/query'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import { validate } from 'uuid'

const PrivateRoute = (): JSX.Element => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { showSnackBar } = useSnackBar()
  const location = useLocation()

  const { data, isLoading, error } = useGetOrCreateUser()
  data && dispatch(setUser(data))

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const projectId = params.get('projectId')

    if (projectId) {
      if (!validate(projectId)) {
        navigate('/')
        showSnackBar(
          'Invalid project ID, reverting to the default project',
          'error'
        )
      } else {
        dispatch(setReceivedProjectId(projectId))
        const newParams = new URLSearchParams(location.search)
        newParams.delete('projectId')
        navigate(`?${newParams.toString()}`, { replace: true })
      }
    }
  }, [location.search, navigate, showSnackBar])

  useEffect(() => {
    if (error) {
      localStorage.setItem(
        'redirectUrl',
        window.location.pathname + window.location.search
      )
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
      localStorage.setItem(
        'redirectUrl',
        window.location.pathname + window.location.search
      )
      navigate('/login')
    }
    if (data && data.id !== '' && data.projectsRoleAssigned.length !== 0) {
      setIsAuthorized(true)
    }
  }, [navigate, error, showSnackBar, data, dispatch])

  return data && data.id === '' ? (
    <Navigate to="/login" />
  ) : data?.projectsRoleAssigned.length === 0 ? (
    <Navigate to="/login/role" />
  ) : (
    <PageWrapper isLoading={isLoading} isAuthorized={isAuthorized} />
  )
}

export default PrivateRoute
