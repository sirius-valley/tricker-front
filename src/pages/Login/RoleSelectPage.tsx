import StepNavigation, {
  StepType
} from '@components/NextBackButtons/NextBackButtons'
import WrapperPage from '@components/Wrapper/WrapperPage'
import { useNavigate } from 'react-router-dom'
import { type Screen } from '@utils/types'
import useScreenSize from '@hooks/useScreenSize'
import RoleButton from '@components/RoleButton/RoleButton'

const RoleSelectPage = (): JSX.Element => {
  const screen: Screen = useScreenSize()
  const navigate = useNavigate()
  return screen.width >= 768 ? (
    <WrapperPage>
      <div className="flex flex-col gap-8">
        <div className="max-w-[680px] lg:max-w-[1048px] mx-auto">
          <div className="flex justify-center w-full gap-12 mb-12">
            <RoleButton handleClick={() => {}}>
              I&apos;m a Project Manager
            </RoleButton>
            <RoleButton handleClick={() => {}}>
              I&apos;m a Team Member
            </RoleButton>
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
      <div className="flex flex-col items-center justify-center gap-10">
        <h1
          className="font-normal text-white leading-[29px] text-center"
          style={{ fontSize: '24px' }}
        >
          What&apos;s your role?
        </h1>
        <div className="w-[329px] flex flex-col gap-6">
          <RoleButton handleClick={() => {}}>
            I&apos;m a Project Manager
          </RoleButton>
          <RoleButton handleClick={() => {}}>I&apos;m a Team Member</RoleButton>
          <StepNavigation
            currentStep={StepType.LAST}
            onBack={() => {
              navigate('/login')
            }}
          />
        </div>
      </div>
    </WrapperPage>
  )
}

export default RoleSelectPage
