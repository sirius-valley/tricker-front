import * as service from '@data-provider/service'
import React from 'react'
import PageWrapper from './PrivateRouteWrapper'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@redux/hooks'
import { setUser } from '@redux/user'

const PrivateRoute = (): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(true)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handlePrivateRoutes = async (): Promise<void> => {
    try {
      const user = await service.getOrCreateUser()
      if (user) {
        dispatch(setUser(user))
        if (user.projectsRoleAssigned?.length === 0) {
          navigate('/login/role')
        } else {
          setIsAuthorized(user !== null)
        }
      }
      setIsLoading(false)
    } catch (e) {
      console.error(e)
      setIsAuthorized(false)
      setIsLoading(false)
      throw e
    }
  }

  React.useEffect(() => {
    handlePrivateRoutes()
  })

  return <PageWrapper isLoading={isLoading} isAuthorized={isAuthorized} />
}

export default PrivateRoute
