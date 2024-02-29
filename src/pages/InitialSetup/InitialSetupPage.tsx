import StepNavigation, {
  StepType
} from '@components/NextBackButtons/NextBackButtons'
import { Stepper } from '@components/Stepper/Stepper'
import { useAppDispatch, useAppSelector, useSteps } from '@redux/hooks'
import { setCurrentStep } from '@redux/user'
import { type Step } from '@utils/types'
import WrapperPage from '@components/Wrapper/WrapperPage'
import { ProjectAddition } from '@components/ProjectAddition/ProjectAddition'
import { useState } from 'react'

const SetupPage = (): JSX.Element => {
  const steps: Step[] = useSteps()
  const currentStep: number = useAppSelector((state) => state.user.currentStep)
  const dispatch = useAppDispatch()
  let stepType: StepType
  if (currentStep === 0) {
    stepType = StepType.FIRST
  } else if (currentStep === steps.length - 1) {
    stepType = StepType.LAST
  } else {
    stepType = StepType.MID
  }
  const handleBackButton = (): void => {
    if (currentStep > 0) {
      dispatch(setCurrentStep(currentStep - 1))
    }
  }

  const handleNextButton = (): void => {
    if (currentStep < steps.length - 1) {
      dispatch(setCurrentStep(currentStep + 1))
    }
  }

  const [token, setToken] = useState<null | string>(null)
  const [provider, setProvider] = useState<null | string>(null)

  const handleToken = (token: string): void => {
    setToken(token)
  }

  const handleSelectedProvider = (provider: string): void => {
    setProvider(provider)
  }

  return (
    <WrapperPage>
      <div className="flex w-fit items-center justify-center flex-col gap-8">
        <Stepper currentStep={currentStep} label={steps} />
        {currentStep === 0 && (
          <ProjectAddition
            providers={['Linear']}
            handleToken={handleToken}
            handleSelectedProvider={handleSelectedProvider}
          />
        )}
        {currentStep === 1 && (
          <div>
            <h1>Step 2</h1>
          </div>
        )}
        <StepNavigation
          currentStep={stepType}
          onBack={handleBackButton}
          onNext={handleNextButton}
          nextDisabled={
            (currentStep === 0 && (!token || !provider)) || currentStep === 1
          }
        ></StepNavigation>
      </div>
    </WrapperPage>
  )
}

export default SetupPage
