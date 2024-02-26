import StepNavigation, {
  StepType
} from '@components/NextBackButtons/NextBackButtons'
import { Stepper } from '@components/Stepper/Stepper'
import { useAppSelector, useSteps } from '@redux/hooks'
import { type Step } from '@utils/types'

const StepperExample = (): JSX.Element => {
  const steps: Step[] = useSteps()
  const currentStep: number = useAppSelector((state) => state.user.currentStep)
  let stepType: StepType
  if (currentStep === 0) {
    stepType = StepType.FIRST
  } else if (currentStep === steps.length - 1) {
    stepType = StepType.LAST
  } else {
    stepType = StepType.MID
  }
  const handleBackButton = (): void => {}
  const handleNextButton = (): void => {}
  return (
    <div
      className={`flex w-screen h-screen items-center justify-center bg-gray-700 flex-col gap-8`}
    >
      <Stepper currentStep={currentStep} label={steps} />
      <StepNavigation
        currentStep={stepType}
        onBack={handleBackButton}
        onNext={handleNextButton}
      ></StepNavigation>
    </div>
  )
}

export default StepperExample
