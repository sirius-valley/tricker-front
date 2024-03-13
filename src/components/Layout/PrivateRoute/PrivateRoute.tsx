import React from 'react'
import PageWrapper from './PrivateRouteWrapper'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@redux/hooks'
import { setUser } from '@redux/user'
import { useGetOrCreateUser } from '@data-provider/query'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'

const PrivateRoute = (): JSX.Element => {
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(true)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { showSnackBar } = useSnackBar()

  const { data, isLoading, error } = useGetOrCreateUser()

  React.useEffect(() => {
    if (error) {
      showSnackBar('You are not authorized to access the home page', 'error')
      setIsAuthorized(false)
      navigate('/login')
    }
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
  }, [navigate, error, showSnackBar, data, dispatch])

  return <PageWrapper isLoading={isLoading} isAuthorized={isAuthorized} />
}

export default PrivateRoute
