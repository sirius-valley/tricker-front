// import { useAppDispatch } from '@redux/hooks'
import { getTokens } from '@service/Cookies'
import { service } from '@service/service'
import { type Tokens } from '@utils/types'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = (): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false)
  const token: Tokens = getTokens()
  // Discomment dispatch lines when redux setup is done.
  // const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (token !== undefined) {
      service
        .me()
        .then((res) => {
          setIsAuthorized(res !== null)
          // dispatch(setUser(res));
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
