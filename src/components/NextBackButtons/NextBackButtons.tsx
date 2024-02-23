import React from 'react'
import Body1 from '@utils/typography/body1/body1'

export enum Step {
  First = 'First',
  Last = 'Last',
  Unique = 'Unique'
}

export interface NavProps {
  currentStep: Step
  onBack: () => void
  onNext: () => void
}

const StepNavigation: React.FC<NavProps> = ({ currentStep }) => {
  const isFirstStep = currentStep === Step.First
  const isLastStep = currentStep === Step.Last
  const isUniqueStep = currentStep === Step.Unique

  const handleNext = (): void => {
    console.log('Go next')
  }

  const handleBack = (): void => {
    console.log('Go back')
  }

  return (
    <div className="w-full flex justify-center">
      {!isFirstStep && (
        <button
          className="w-[273px] h-[51px] gap-3 rounded-xl bg-transparent hover:bg-gray-400 border border-primary-400 text-white px-4 mr-6 transition-all duration-300 ease-in-out focus:outline-none"
          onClick={handleBack}
        >
          <Body1>Back</Body1>
        </button>
      )}
      {!isUniqueStep && !isLastStep && (
        <button
          className="w-[273px] h-[51px] gap-3 rounded-xl bg-primary-400 hover:bg-primary-500 text-black px-4 transition-all duration-300 ease-in-out focus:outline-none"
          onClick={handleNext}
        >
          <Body1>Next</Body1>
        </button>
      )}
    </div>
  )
}

export default StepNavigation
