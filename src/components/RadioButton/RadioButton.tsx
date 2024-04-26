import React from 'react'

export interface RadioButtonProps {
  id: string
  handleChecked: (id: string) => void
  selectedValue: string
  disabled?: boolean
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  handleChecked,
  selectedValue,
  disabled = true
}) => {
  const checked = selectedValue === id
  const handleChange = (): void => {
    handleChecked(id)
  }

  return (
    <div>
      <label className={disabled ? 'cursor-not-allowed' : 'cursor-pointer'}>
        <input
          id={`radio-button-${id}`}
          type="radio"
          className="peer sr-only"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
        <div
          className={`p-0.5 border border-gray-${disabled ? '400' : '300'} peer-checked:border-${disabled ? 'gray' : 'primary'}-400 rounded-full`}
        >
          <div
            className={`h-2 w-2 rounded-full bg-${disabled ? 'gray-400' : checked ? 'primary-400' : 'transparent'}`}
          />
        </div>
      </label>
    </div>
  )
}

export default RadioButton
