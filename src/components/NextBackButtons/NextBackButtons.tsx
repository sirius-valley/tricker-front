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

const StepNavigation: React.FC<NavProps> = ({
  currentStep,
  onBack,
  onNext
}) => {
  const isFirstStep = currentStep === StepType.FIRST
  const isLastStep = currentStep === StepType.LAST

  return (
    <div className="flex justify-center gap-6">
      {!isFirstStep && (
        <Button
          variant="outline"
          className="w-[273px] h-fit text-white"
          onClick={onBack}
        >
          Back
        </Button>
      )}
      {!isLastStep && (
        <Button variant="filled" className="w-[273px] h-fit" onClick={onNext}>
          Next
        </Button>
      )}
    </div>
  )
}

export default StepNavigation
