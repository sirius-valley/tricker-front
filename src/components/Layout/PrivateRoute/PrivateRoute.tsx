// import { useAppDispatch } from '@redux/hooks'
import { service } from '@service/service'
import { type User } from '@utils/types'
import React from 'react'
import PageWrapper from './PrivateRouteWrapper'

const PrivateRoute = (): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(true)
  // const dispatch = useAppDispatch()

  const handlePrivateRoutes = async (): Promise<void> => {
    try {
      const authorization: User | null = await service.getOrCreateUser()
      setIsAuthorized(authorization !== null)
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
  }, [])

  return <PageWrapper isLoading={isLoading} isAuthorized={isAuthorized} />
}

export default PrivateRoute
