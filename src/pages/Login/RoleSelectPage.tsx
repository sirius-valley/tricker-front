import StepNavigation, {
  StepType
} from '@components/NextBackButtons/NextBackButtons'
import WrapperPage from '@components/Wrapper/WrapperPage'
import { useNavigate } from 'react-router-dom'
import { type Screen } from '@utils/types'
import useScreenSize from '@hooks/useScreenSize'
import Button from '@components/Button/Button'
// import RoleButton from '@components/RoleButton/RoleButton'

const RoleSelectPage = (): JSX.Element => {
  const screen: Screen = useScreenSize()
  const navigate = useNavigate()
  return screen.width >= 768 ? (
    <WrapperPage>
      <div className="flex flex-col gap-8">
        <div className="max-w-[680px] lg:max-w-[1048px] mx-auto">
          <div className="flex justify-center w-full gap-12 mb-12">
            <div className="bg-gray-600 rounded-lg">
              <Button
                variant="outline"
                className="w-[100%] lg:w-[500px] h-[500px] text-white shadow-2"
                onClick={() => {
                  navigate('')
                }}
              >
                <h1 className="font-semibold text-lg leading-[41px] text-[34px]">
                  I&apos;m a Project Manager
                </h1>
              </Button>
            </div>
            {/* <RoleButton handleClick={()=>{}}>
              I&apos;m a Project Manager
            </RoleButton>
            <RoleButton handleClick={()=>{}}>
            I&apos;m a Team Member
            </RoleButton> */}
            <div className="bg-gray-600 rounded-lg">
              <Button
                variant="outline"
                className="w-[100%] lg:w-[500px] h-[500px] text-white shadow-2"
                onClick={() => {
                  navigate('/login')
                }}
              >
                <h1
                  className="font-semibold text-lg leading-[41px]"
                  style={{ fontSize: '34px' }}
                >
                  I&apos;m a Team Member
                </h1>
              </Button>
            </div>
          </div>
          <div className="mb-6">
            <StepNavigation
              currentStep={StepType.LAST}
              onBack={() => {
                navigate('/login')
              }}
            />
          </div>
        </div>
      </div>
    </WrapperPage>
  ) : (
    <WrapperPage>
      {/* <div className="mb-6">
            <StepNavigation
            currentStep={StepType.LAST}
            onBack={() => {
                navigate('/login')
            }}
            />
            </div> */}
      <div className="w-[329px] h-[205px]">
        <div className="flex flex-col items-center mb-8">
          <h1
            className="font-normal text-white leading-[29px]"
            style={{ fontSize: '24px' }}
          >
            What&apos;s your role?
          </h1>
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-gray-600 rounded-lg">
            <Button
              variant="outline"
              className="w-full h-[56px] text-white shadow-2"
              onClick={() => {
                navigate('/login')
              }}
            >
              <h1
                className="font-semibold text-lg leading-[24px]"
                style={{ fontSize: '20px' }}
              >
                I&apos;m a Project Manager
              </h1>
            </Button>
          </div>
          <div className="bg-gray-600 rounded-lg">
            <Button
              variant="outline"
              className="w-full h-[56px] text-white shadow-2"
              onClick={() => {
                navigate('/login')
              }}
            >
              <h1
                className="font-semibold text-lg leading-[24px]"
                style={{ fontSize: '20px' }}
              >
                I&apos;m a Team Member
              </h1>
            </Button>
          </div>
        </div>
      </div>
    </WrapperPage>
  )
}

export default RoleSelectPage
