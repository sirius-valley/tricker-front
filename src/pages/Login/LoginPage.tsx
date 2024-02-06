import LoginBackground from '@assets/Login/LoginBackground'
import LoginImage from '@assets/Login/LoginImage.png'
import TrickerLogo from '@assets/TrickerLogo'
import TrickerTitle from '@assets/TrickerTitle'

import { LoginWithButton } from '@components/LoginWithButton/LoginWithButton'
import { NeedHelpButton } from '@components/NeedHelpButton/NeedHelpButton'

const LoginPage = (): JSX.Element => {
  return (
    <div className="flex bg-gray-700">
      <div className="flex justify-center w-[454px] h-screen items-end">
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
      <LoginBackground className="w-screen h-screen" />
      <img
        src={LoginImage}
        className="absolute  h-[634px] bottom-0 right-0"
        alt="Login image"
      />
    </div>
  )
}

export default LoginPage
