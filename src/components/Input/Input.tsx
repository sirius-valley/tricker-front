import React, { useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import Body2 from '@utils/typography/body2/body2'
import HelperText from '@utils/typography/helpertext/helpertext'

const inputVariants = cva(
  [
    'outline-none placeholder-gray-300 bg-transparent border rounded-lg py-3 px-4 w-[306px] h-[43px] text-gray-300'
  ],
  {
    variants: {
      variant: {
        default: [
          'text-white cursor-pointer',
          'hover:border-2 border-gray-300',
          'focus:border-primary-400'
        ],
        error: ['border-error-500', 'focus:border-primary-400'],
        disabled: ['disabled:bg-gray-300/20', 'cursor-not-allowed']
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
export interface InputProps
  extends VariantProps<typeof inputVariants>,
    React.HTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password'
  helpertext?: string
  icon?: string
  label?: string
  required?: boolean
  placeholder?: string
  handleValue: (value: string) => void
}

const Input = ({
  className,
  variant,
  type = 'text',
  helpertext = '',
  label = '',
  required = false,
  handleValue,
  placeholder = ''
}: InputProps): JSX.Element => {
  const [value, setValue] = useState<string>('')
  const textColor: string =
    variant === 'error'
      ? 'text-error-500'
      : variant === 'disabled'
        ? 'text-gray-300'
        : 'text-white'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
    handleValue(e.target.value)
  }
  return (
    <div className="gap-2 flex flex-col">
      {label !== '' && (
        <Body2
          className={` ${variant === 'disabled' ? 'text-gray-300' : 'text-white'} flex text-sm`}
        >
          {label}
          {variant !== 'disabled' && required && (
            <Body2 className="text-error-500 flex text-sm">*</Body2>
          )}
        </Body2>
      )}
      <input
        className={inputVariants({ variant, className })}
        value={value}
        type={type}
        required={required}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={variant === 'disabled'}
      />

      {helpertext !== '' && (
        <HelperText className={textColor}>{helpertext}</HelperText>
      )}
    </div>
  )
}

export default Input
