import React from 'react'
import Body2 from '@utils/typography/body2/body2'
import { type Step } from '@utils/types'
import Body1 from '@utils/typography/body1/body1'

export interface StepperProps extends React.HTMLAttributes<HTMLInputElement> {
  currentStep: number
  label: Step[]
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, label }) => {
  const activeColor = (index: number): string =>
    currentStep >= index ? 'primary-200' : 'gray-200'
  return (
    <div className="flex w-fit">
      {label.map((step: Step, index: number) => (
        <React.Fragment key={index}>
          {index !== 0 && (
            <div
              className={`w-[120px] h-0 mt-4 border border-${activeColor(index)}`}
            />
          )}
          <div className="flex flex-col items-center gap-2.5 w-8">
            <div
              className={`rounded-full bg-${activeColor(index)} w-8 h-8 flex justify-center items-center`}
            >
              <Body2
                className={`leading-[19.36px] text-${currentStep >= index ? 'primary-700 font-bold' : 'gray-400 font-medium'}`}
              >
                {index + 1}
              </Body2>
            </div>
            <div className="hidden md:flex">
              <Body1
                className={`leading-[19.36px] text-white whitespace-nowrap ${index === currentStep ? 'font-semibold' : 'font-normal'}`}
              >
                {step.label}
              </Body1>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}
