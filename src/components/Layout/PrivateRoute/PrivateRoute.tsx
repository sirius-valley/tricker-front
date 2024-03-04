// eslint-disable-next-line
import * as service from '@data-provider/service'
import React from 'react'
import PageWrapper from './PrivateRouteWrapper'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useUser } from '@redux/hooks'
import { setUser } from '@redux/user'
import { type User } from '@utils/types'

const PrivateRoute = (): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(true)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // -------------------- Testing porpuses, remove later --------------------
  const mockedUser: User = {
    id: '1',
    email: 'username@sirius.com.ar',
    name: 'User Name',
    projectsRoleAssigned: [
      {
        id: '1',
        userId: '1',
        projectId: '1',
        user: {
          id: '1',
          cognitoId: '',
          profileImage: '',
          email: '',
          name: ''
        },
        role: {
          id: '1',
          name: 'Project Manager',
          users: []
        }
      }
    ]
  }
  const user = useUser()
  // -------------------- Testing porpuses, remove later --------------------

  React.useEffect(() => {
    dispatch(setUser(mockedUser)) // -------------------- Testing porpuses, remove later
    try {
      // const user = await service.getOrCreateUser()
      if (user.id !== '') {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dispatch, setIsLoading])

  return <PageWrapper isLoading={isLoading} isAuthorized={isAuthorized} />
}

export default PrivateRoute
