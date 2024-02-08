import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = (): JSX.Element => {
  // TODO: Use authentication token
  // const httpRequestService = useHttpRequestService()
  const [isLoading, setisLoading] = React.useState<boolean>(true)
  // const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false)

  const handlePrivateRoutes = /* async */ (): void /* Promise<void> */ => {
    // const auth = await httpRequestService.routingAuth()
    // setIsAuthorized(auth.isValidToken)
    setisLoading(false)
  }

  React.useEffect(() => {
    handlePrivateRoutes()
  }, [])

  if (isLoading) {
    // return <Loader/>
  }

  return isLoading ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute
