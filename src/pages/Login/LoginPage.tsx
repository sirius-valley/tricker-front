import LoginImage from '@assets/Login/LoginImage.svg'
import TrickerLogo from '@assets/TrickerLogo'
import TrickerTitle from '@assets/TrickerTitle'
import { LoginWithButton } from '@components/LoginWithButton/LoginWithButton'
import { NeedHelpButton } from '@components/NeedHelpButton/NeedHelpButton'
import { useVerifyToken } from '@data-provider/query'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import config from '@utils/config.ts'

const LoginPage = (): JSX.Element => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const code = searchParams.get('code')

  const { data } = useVerifyToken(code || '')

  useEffect(() => {
    if (data) {
      navigate('/')
    }
  }, [data, navigate])

  return (
    <div className={`flex bg-login bg-cover`}>
      <div className="flex justify-center md:max-w-[542px] w-full h-screen items-end bg-gray-700">
        <div className="mb-[54px] flex flex-col w-fit h-[59%] items-center justify-between">
          <div className="flex flex-col items-center gap-6">
            <TrickerLogo />
            <TrickerTitle />
            <LoginWithButton
              title="Log In With Google"
              iconName="GoogleIcon"
              redirectUrl={config.cognitoRedirectUrl}
            />
          </div>
          <NeedHelpButton />
        </div>
      </div>
      <div className="hidden md:flex justify-end items-end h-screen w-full ">
        <img src={LoginImage} alt="Login image" />
      </div>
    </div>
  )
}

export default LoginPage
