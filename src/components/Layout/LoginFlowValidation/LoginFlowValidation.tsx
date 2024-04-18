import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import { type Tokens } from '@utils/types'
import { getTokens } from '@data-provider/Cookies'

const LoginFlowValidation = (): JSX.Element => {
  const { showSnackBar } = useSnackBar()
  const tokens: Tokens = getTokens()

  useEffect(() => {
    if (!tokens.access_token || !tokens.id_token || !tokens.refresh_token) {
      showSnackBar(
        'You have to log in first before accessing this page.',
        'error'
      )
    }
  }, [showSnackBar])

  if (!tokens.access_token || !tokens.id_token || !tokens.refresh_token) {
    localStorage.setItem(
      'redirectUrl',
      window.location.pathname + window.location.search
    )
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

export default LoginFlowValidation
