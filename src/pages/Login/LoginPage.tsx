import LoginImage from '@assets/Login/LoginImage.svg'
import TrickerLogo from '@assets/TrickerLogo'
import TrickerTitle from '@assets/TrickerTitle'

import { LoginWithButton } from '@components/LoginWithButton/LoginWithButton'
import { NeedHelpButton } from '@components/NeedHelpButton/NeedHelpButton'
import { setLoginCookie } from '@service/Cookies'
import { service } from '@service/service'
import { type CognitoResponse } from '@utils/types'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const LoginPage = (): JSX.Element => {
  const [searchParams] = useSearchParams()

  React.useEffect((): void => {
    const verifyToken = (): void => {
      const code = searchParams.get('code')
      if (code !== null) {
        service
          .verifyToken(code)
          .then((response: CognitoResponse | null) => {
            if (response) {
              setLoginCookie(response)
              window.location.replace('/')
            }
            return null
          })
          .catch((error) => {
            console.error('Error verifying token:', error)
          })
      }
    }
    verifyToken()
  }, [searchParams])

  return (
    <div className={`flex bg-login bg-cover`}>
      <div className="flex justify-center w-[542px] h-screen items-end bg-gray-700">
        <div className="mb-[54px] flex flex-col w-fit h-[59%] items-center justify-between">
          <div className="flex flex-col items-center gap-6">
            <TrickerLogo />
            <TrickerTitle />
            <LoginWithButton
              title="Log In With Google"
              iconName="GoogleIcon"
              redirectUrl={
                'https://tricker.auth.us-east-2.amazoncognito.com/oauth2/authorize?response_type=code&client_id=1uibn62hen866a6qufocjp8uuk&identity_provider=Google&redirect_uri=http://localhost:5173/login/&scope=profile+email+openid'
              }
            />
          </div>
          <NeedHelpButton />
        </div>
      </div>
      <div className="flex justify-end items-end h-screen w-full">
        <img src={LoginImage} alt="Login image" />
      </div>
    </div>
  )
}

export default LoginPage
