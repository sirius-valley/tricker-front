import React, { useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import Body2 from '@utils/typography/body2/body2'
import HelperText from '@utils/typography/helpertext/helpertext'
import Body1 from '@utils/typography/body1/body1'
import Icon from '@components/Icon/Icon'
import type * as icons from '@components/Icon/index.ts'

const selectInputVariants = cva(
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

export interface SelectInputProps
  extends VariantProps<typeof selectInputVariants>,
    React.HTMLAttributes<HTMLDivElement> {
  icon?: keyof typeof icons
  label?: string
  required?: boolean
  helperText?: string
  options: Array<{ value: string; label: string }>
}

const SelectInput = ({
  className,
  icon,
  variant,
  label = '',
  required = false,
  helperText = '',
  options
}: SelectInputProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [displayHelperText, setDisplayHelperText] = useState<boolean>(true)
  const [rotateIcon, setRotateIcon] = useState<boolean>(false)
  const textColor: string =
    variant === 'error'
      ? 'text-error-500'
      : variant === 'disabled'
        ? 'text-gray-300'
        : 'text-white'

  const toggleOptions = (): void => {
    setIsOpen(!isOpen)
    setDisplayHelperText(false)
    setTimeout(() => {
      setRotateIcon(!rotateIcon)
    }, 0)
  }

  const handleOptionSelect = (value: string): void => {
    setSelectedOption(value)
    setIsOpen(false)
    setDisplayHelperText(true)
    setRotateIcon(false)
  }

  return (
    <div className="gap-2 flex flex-col">
      {label !== '' && (
        <Body2
          className={`${variant === 'disabled' ? 'text-gray-300' : 'text-white'} flex text-sm`}
        >
          {label}
          {required && (
            <>
              &nbsp;
              <Body2
                className={`flex text-sm ${variant === 'disabled' ? 'text-gray-300' : 'text-error-500'}`}
              >
                *
              </Body2>
            </>
          )}
        </Body2>
      )}
      <div className="relative" style={{ width: '290px' }}>
        <button
          className={`${selectInputVariants({ variant, className })}`}
          onClick={toggleOptions}
          disabled={variant === 'disabled'}
          style={{ textAlign: 'left' }}
        >
          <Body1>{selectedOption || 'Selected item title'}</Body1>
          {icon && (
            <div
              className="absolute right-0 top-0 bottom-0 flex items-center"
              style={{
                transition: 'transform 0.3s ease',
                transform: rotateIcon ? 'rotate(180deg)' : 'none'
              }}
            >
              {<Icon name={icon} width="18" height="18" />}
            </div>
          )}
        </button>
        {isOpen && (
          <div className="absolute left-0 w-[306px] bg-transparent">
            <div className="text-white border rounded-lg shadow-lg">
              {options.map((option) => (
                <div
                  key={option.value}
                  className="px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-400"
                  onClick={() => {
                    handleOptionSelect(option.value)
                  }}
                >
                  <Body1>{option.label}</Body1>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {displayHelperText && (
        <HelperText className={textColor}>{helperText}</HelperText>
      )}
    </div>
  )
}

export default SelectInput
