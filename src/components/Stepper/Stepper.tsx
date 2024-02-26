import React from 'react'
import Body2 from '@utils/typography/body2/body2'

export interface StepperProps extends React.HTMLAttributes<HTMLInputElement> {
  currentStep: number
  numberOfSteps: number
  label: string
}

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  numberOfSteps
}) => {
  const activeColor = (index: number): string =>
    currentStep >= index ? 'primary-200' : 'gray-200'
  return (
    <div className="flex items-center justify-center w-fit">
      {Array.from({ length: numberOfSteps }).map((_, index) => (
        <React.Fragment key={index}>
          {index !== 0 && (
            <div className={`w-[120px] border border-${activeColor(index)}`} />
          )}
          <div
            className={`rounded-full bg-${activeColor(index)} w-8 h-8 flex justify-center items-center`}
          >
            <Body2
              className={`leading-[19.36px] text-${currentStep >= index ? 'primary-700' : 'gray-400'}`}
            >
              {index + 1}
            </Body2>
          </div>
          {/* <Body1 className="leading-[19.36px] text-white">{label}</Body1> */}
        </React.Fragment>
      ))}
    </div>
  )
}
