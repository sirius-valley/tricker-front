import React from 'react'
import PageWrapper from './PrivateRouteWrapper'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@redux/hooks'
import { setUser } from '@redux/user'
import { useGetOrCreateUser } from '@data-provider/query'

const PrivateRoute = (): JSX.Element => {
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(true)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { data, isLoading, error } = useGetOrCreateUser()

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
