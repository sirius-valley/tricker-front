import { Stepper } from '@components/Stepper/Stepper'
import { useAppSelector, useSteps } from '@redux/hooks'
import { type Step } from '@utils/types'

const StepperExample = (): JSX.Element => {
  const steps: Step[] = useSteps()
  const currentStep: number = useAppSelector((state) => state.user.currentStep)
  return (
    <div className={`flex w-screen h-screen bg-gray-700`}>
      <Stepper
        currentStep={currentStep}
        numberOfSteps={steps.length}
        label={steps}
      />
    </div>
  )
}

export default StepperExample
