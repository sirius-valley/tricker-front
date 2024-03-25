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
  }, [tokens, showSnackBar])

  return !tokens.access_token || !tokens.id_token || !tokens.refresh_token ? (
    <Navigate to="/login" replace />
  ) : (
    <Outlet />
  )
}

export default LoginFlowValidation
