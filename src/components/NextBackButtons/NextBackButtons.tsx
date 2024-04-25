import React from 'react'
import Button from '@components/Button/Button'
import Spinner from '@components/Spinner/Spinner'

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
  isLoading: boolean | null
}

const StepNavigation: React.FC<NavProps> = ({
  currentStep,
  onBack,
  onNext,
  nextDisabled,
  showBackButton = true,
  isLoading
}) => {
  const isLastStep = currentStep === StepType.LAST

  const handleNext = (): void => {
    ;(isLoading === null || !isLoading) && onNext && onNext()
  }

  const handleBack = (): void => {
    onBack && onBack()
  }
  console.log(isLoading)
  return (
    <div className="flex justify-center gap-6">
      {showBackButton && (
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
          {isLoading === true ? (
            <Spinner variant={'black'} size={16} />
          ) : (
            'Next'
          )}
        </Button>
      )}
    </div>
  )
}

export default StepNavigation
