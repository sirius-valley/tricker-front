import React from 'react'
import Button from '@components/Button/Button'

export enum StepType {
  FIRST = 'First',
  LAST = 'Last',
  MID = 'Mid'
}

export interface NavProps {
  currentStep: StepType
  onBack?: () => void
  onNext?: () => void
  nextDisabled?: boolean
  showBackButton?: boolean
}

const StepNavigation: React.FC<NavProps> = ({
  currentStep,
  onBack,
  onNext,
  nextDisabled,
  showBackButton = true
}) => {
  const isFirstStep = currentStep === StepType.FIRST
  const isLastStep = currentStep === StepType.LAST

  const handleNext = (): void => {
    onNext && onNext()
  }

  const handleBack = (): void => {
    onBack && onBack()
  }

  return (
    <div className="flex justify-center gap-6">
      {!isFirstStep && showBackButton && (
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
          className="w-[329px] h-fit md:w-[273px]"
          onClick={handleNext}
          disabled={nextDisabled}
        >
          Next
        </Button>
      )}
    </div>
  )
}

export default StepNavigation
