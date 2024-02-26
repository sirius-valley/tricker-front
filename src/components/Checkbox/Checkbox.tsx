import config from '../../../tailwind.config'
import CheckIcon from '@utils/icons/CheckIcon'
import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  defaultChecked: boolean
  onChecked?: (checked: boolean) => void
}

export const Checkbox: React.FC<CheckboxProps> = ({
  onChecked,
  defaultChecked
}) => {
  const [checked, setChecked] = React.useState<boolean>(defaultChecked)
  const checkboxId: string = uuidv4()
  const handleChange = (): void => {
    setChecked(!checked)
    onChecked && onChecked(!checked)
  }
  const colors = config.theme.extend.colors

  useEffect(() => {
    setChecked(defaultChecked)
  }, [defaultChecked])

  return (
    <div className="inline-flex items-center">
      <div className="relative inline-block h-[16.25px] w-[16.25px] rounded-full cursor-pointer">
        <input
          id={checkboxId}
          type="checkbox"
          onClick={handleChange}
          className="absolute left-0 h-[16.25px] w-[16.25px] border-[1.11px] rounded-[4.44px] appearance-none cursor-pointer peer bg-transparent checked:bg-primary-400 hover:bg-gray-300/20 checked:hover:bg-primary-500 checked:border-none"
          style={{
            backgroundColor: checked ? colors.primary[400] : 'transparent',
            border: `1.11px solid ${checked ? colors.primary[400] : colors.gray[300]}`
          }}
        />
        {checked && (
          <label
            htmlFor={checkboxId}
            className="absolute left-0 h-[16.25px] w-[16.25px] cursor-pointer bg-transparent"
          >
            <CheckIcon
              width={'16.25px'}
              height={'16.25px'}
              fillColor={colors.gray[500]}
            />
          </label>
        )}
      </div>
    </div>
  )
}

export default Checkbox
