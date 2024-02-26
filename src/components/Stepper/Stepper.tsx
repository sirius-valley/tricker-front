import React from 'react'
import Body2 from '@utils/typography/body2/body2'
import Body1 from '@utils/typography/body1/body1'

export interface StepperProps extends React.HTMLAttributes<HTMLInputElement> {
  stepNumber: number
  label: string
}

export const Stepper: React.FC<StepperProps> = ({ stepNumber, label }) => {
  return (
    <div className="flex items-center jusify-center">
      <div className="rounded-full bg-primary-200 w-8 h-8">
        <Body2 className="leading-[19.36px] text-primary-700">
          {stepNumber}
        </Body2>
      </div>
      <span className="h-1 w-8 bg-blue-500"></span>
      <Body1 className="leading-[19.36px] font-white">{label}</Body1>
    </div>
  )
}
