import React, { useEffect } from 'react'
import PageWrapper from './PrivateRouteWrapper'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@redux/hooks'
import { setUser } from '@redux/user'
import { useGetOrCreateUser } from '@data-provider/query'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider.tsx'

const PrivateRoute = (): JSX.Element => {
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(true)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { showSnackBar } = useSnackBar()

  const { data, isLoading, error } = useGetOrCreateUser()

  useEffect(() => {
    if (error) {
      navigate('/login')
      setIsAuthorized(false)
      showSnackBar('You are not authorized to access this page', 'error')
      console.error(error)
    }
  }, [error, navigate, showSnackBar])

  React.useEffect(() => {
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
      throw e
    }
  }, [data, navigate, dispatch, error])

  return <PageWrapper isLoading={isLoading} isAuthorized={isAuthorized} />
}

export default PrivateRoute
