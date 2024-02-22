import config from '../../../tailwind.config'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'

export interface RadioButtonProps
  extends React.HTMLAttributes<HTMLInputElement> {
  onChecked?: (checked: boolean) => void
}

export const RadioButton: React.FC<RadioButtonProps> = () => {
  const radioButtonId: string = uuidv4()
  const colors = config.theme.extend.colors

  return (
    <div className="inline-flex items-center">
      <div className="relative inline-block h-[16.25px] w-[16.25px] rounded-full cursor-pointer">
        <input
          id={radioButtonId}
          type="radio"
          className="absolute left-0 h-[15px] w-[15px] border appearance-none cursor-pointer peer bg-transparent checked:bg-primary-400 hover:bg-gray-300/20 checked:border-none"
          style={{
            backgroundColor: colors.primary[400] ?? 'transparent',
            border: `1.11px solid ${colors.primary[400] ?? colors.gray[300]}`
          }}
        />
        <label
          htmlFor={radioButtonId}
          className="absolute left-0 h-[15px] w-[15px] cursor-pointer bg-transparent"
        >
          aaa
        </label>
      </div>
    </div>
  )
}

export default RadioButton
