import StepNavigation, {
  StepType
} from '@components/NextBackButtons/NextBackButtons'
import WrapperPage from '@components/Wrapper/WrapperPage'
import useScreenSize from '@hooks/useScreenSize'
import { type Screen } from '@utils/types'
import H2 from '@utils/typography/h2/h2'
import { useNavigate } from 'react-router-dom'

const EmptyProjectPage = (): JSX.Element => {
  const screen: Screen = useScreenSize()
  const navigate = useNavigate()
  return screen.width >= 768 ? (
    <WrapperPage>
      <div className="flex flex-col gap-8">
        <div className="max-w-[680px] lg:max-w-[1048px] bg-gray-600 gap-12">
          <div className="border border-primary-400 py-10 px-2 gap-2 w-full rounded-xl shadow-2">
            <div className="w-full px-[136px] gap-8">
              <H2 className="lg:text-[34px] leading-[41.15px] text-center text-white font-medium">
                Looks like there are no projects with you as a team member yet
              </H2>
            </div>
          </div>
        </div>
        <StepNavigation
          currentStep={StepType.LAST}
          onBack={() => {
            navigate('/login')
          }}
        />
      </div>
    </WrapperPage>
  ) : (
    <WrapperPage>
      <div className="flex flex-col gap-8">
        <div className="border border-primary-400 py-6 gap-2 w-[329px] rounded-xl shadow-2">
          <H2 className="text-xl leading-[24.2px] text-center text-white font-medium">
            Looks like there are no projects with you as a team member yet
          </H2>
        </div>
        <StepNavigation
          currentStep={StepType.LAST}
          onBack={() => {
            navigate('/login')
          }}
        />
      </div>
    </WrapperPage>
  )
}

export default EmptyProjectPage
