import { getToken } from '@service/Cookies'
import { service } from '@service/service'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = (): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false)
  const token: string = getToken()

  React.useEffect(() => {
    if (token) {
      service
        .me()
        .then((res) => {
          setIsAuthorized(res !== null)
          return res
        })
        .catch((e) => {
          console.error(e)
          setIsAuthorized(false)
          setIsLoading(false)
          throw e
        })
    } else {
      setIsAuthorized(false)
    }
    setIsLoading(false)
  }, [token])

  if (isLoading) {
    // return <Loader/>
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute
