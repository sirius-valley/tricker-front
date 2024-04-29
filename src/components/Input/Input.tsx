import React, { useEffect, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import Body2 from '@utils/typography/body2/body2'
import HelperText from '@utils/typography/helpertext/helpertext'
import { Tooltip } from '@components/Tooltip/Tooltip'

const inputVariants = cva(
  [
    'placeholder:italic outline-none placeholder-gray-400 bg-transparent border rounded-lg py-3 px-4 w-full h-[43px] text-gray-300'
  ],
  {
    variants: {
      variant: {
        default: [
          'text-white cursor-pointer',
          'hover:border-2 border-gray-300',
          'focus:border-primary-400'
        ],
        error: ['text-white border-error-500', 'focus:border-primary-400'],
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
  value?: string
  type?: 'text' | 'password'
  helpertext?: string
  icon?: string
  label?: string
  required?: boolean
  readonly?: boolean
  placeholder?: string
  tooltip?: string
  handleValue: (value: string) => void
  defaultValue?: string
}

const Input = ({
  value = '',
  className,
  variant,
  type = 'text',
  helpertext = '',
  label = '',
  required = false,
  readonly = false,
  handleValue,
  placeholder = '',
  tooltip = '',
  defaultValue = '',
  onFocus,
  onBlur
}: InputProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const textColor: string =
    variant === 'error'
      ? 'text-error-500'
      : variant === 'disabled'
        ? 'text-gray-300'
        : 'text-white'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
    handleValue(e.target.value)
  }

  useEffect(() => {
    setInputValue(defaultValue)
  }, [defaultValue])

  return (
    <div className="gap-2 flex flex-col">
      {label !== '' && (
        <div className="flex">
          <Body2
            className={`${variant === 'disabled' ? 'text-gray-300' : 'text-white'} flex items-center text-sm font-normal`}
          >
            {label}
          </Body2>
          {tooltip !== '' && (
            <Tooltip content={tooltip} iconWidth="16" iconHeight="16" />
          )}
          {variant !== 'disabled' && required && (
            <Body2 className="text-error-500 flex text-sm font-normal">
              &nbsp;*
            </Body2>
          )}
        </div>
      )}
      <input
        className={className + inputVariants({ variant, className })}
        value={inputValue}
        type={type}
        required={required}
        readOnly={readonly}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={variant === 'disabled'}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {helpertext !== '' && (
        <HelperText className={textColor}>{helpertext}</HelperText>
      )}
    </div>
  )
}

export default Input
