import React from 'react'

export interface RadioButtonProps
  extends React.HTMLAttributes<HTMLInputElement> {
  id: string
  checked: boolean
  handleChecked: (id: string) => void
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  checked,
  handleChecked
}) => {
  return (
    <div className="flex m-2">
      <label className="cursor-pointer" htmlFor={id}>
        <input
          id={id}
          type="radio"
          className="peer sr-only"
          name="pricing"
          checked={checked}
          onChange={() => {
            handleChecked(id)
          }}
        />
        <div className="p-0.5 border border-gray-400 peer-checked:border-primary-400 rounded-full">
          <div
            className={`h-2 w-2 rounded-full bg-${checked ? 'primary-400' : 'transparent'}`}
          />
        </div>
      </label>
    </div>
  )
}

export default RadioButton
