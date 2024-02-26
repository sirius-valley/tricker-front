import React from 'react'
import Button from '@components/Button/Button'

export enum StepType {
  FIRST = 'First',
  LAST = 'Last',
  MID = 'Mid'
}

export interface NavProps {
  currentStep: StepType
  onBack: () => void
  onNext: () => void
}

const StepNavigation: React.FC<NavProps> = ({ currentStep }) => {
  const isFirstStep = currentStep === StepType.FIRST
  const isLastStep = currentStep === StepType.LAST

  const handleNext = (): void => {
    console.log('Go next')
  }

  const handleBack = (): void => {
    console.log('Go back')
  }

  return (
    <div className="flex justify-center gap-6">
      {!isFirstStep && (
        <Button
          variant="outline"
          className="w-[273px] h-fit text-white"
          onClick={handleBack}
        >
          Back
        </Button>
      )}
      {!isLastStep && (
        <Button
          variant="filled"
          className="w-[273px] h-fit"
          onClick={handleNext}
        >
          Next
        </Button>
      )}
    </div>
  )
}

export default StepNavigation
