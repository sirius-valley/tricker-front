import React from 'react'

export interface RadioButtonProps {
  id: string
  handleChecked: (id: string) => void
  selectedValue: string
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  handleChecked,
  selectedValue
}) => {
  const checked = selectedValue === id
  const handleChange = (): void => {
    handleChecked(id)
  }

  return (
    <div>
      <label className="cursor-pointer">
        <input
          id={`radio-button-${id}`}
          type="radio"
          className="peer sr-only"
          checked={checked}
          onChange={handleChange}
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
