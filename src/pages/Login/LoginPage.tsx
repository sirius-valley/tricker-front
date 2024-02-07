import LoginImage from '@assets/Login/LoginImage.svg'
import TrickerLogo from '@assets/TrickerLogo'
import TrickerTitle from '@assets/TrickerTitle'

import { LoginWithButton } from '@components/LoginWithButton/LoginWithButton'
import { NeedHelpButton } from '@components/NeedHelpButton/NeedHelpButton'

const LoginPage = (): JSX.Element => {
  return (
    <div className={`flex bg-login bg-cover`}>
      <div className="flex justify-center w-[542px] h-screen items-end bg-gray-700">
        <div className="mb-[54px] flex flex-col w-[210px] h-[59%] items-center justify-between">
          <div className="flex flex-col items-center gap-6">
            <TrickerLogo />
            <TrickerTitle />
            <LoginWithButton
              title="Log In With Google"
              iconName="GoogleIcon"
              redirectUrl="https://www.google.com/"
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
