import React, { useState, useRef, useEffect, useCallback } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import Body2 from '@utils/typography/body2/body2'
import HelperText from '@utils/typography/helpertext/helpertext'
import Body1 from '@utils/typography/body1/body1'
import Icon from '@components/Icon/Icon'
import type * as icons from '@components/Icon/index.ts'

const selectInputVariants = cva(
  [
    'outline-none placeholder-gray-300 bg-transparent border rounded-lg py-2 px-4 w-full h-[43px] text-gray-300'
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
  preselectedOption?: { value: string; label: string }
  handleSelectedOption: (value: string) => void
}

const SelectInput = ({
  className,
  icon = 'CaretDownIcon',
  variant,
  label = '',
  required = false,
  helperText = '',
  options,
  preselectedOption,
  handleSelectedOption
}: SelectInputProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<{
    value: string
    label: string
  } | null>(preselectedOption || null)
  const [rotateIcon, setRotateIcon] = useState<boolean>(false)
  const textColor: string =
    variant === 'error'
      ? 'text-error-500'
      : variant === 'disabled'
        ? 'text-gray-300'
        : 'text-white'

  const selectRef = useRef<HTMLDivElement | null>(null)

  const toggleOptions = useCallback((): void => {
    setIsOpen(!isOpen)
    setTimeout(() => {
      setRotateIcon(!rotateIcon)
    }, 0)
  }, [isOpen, rotateIcon])

  const handleClickOutside = useCallback(
    (event: MouseEvent): void => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        if (rotateIcon) {
          setRotateIcon(false)
        }
      }
    },
    [rotateIcon]
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  const handleOptionSelect = (option: {
    value: string
    label: string
  }): void => {
    setSelectedOption(option)
    handleSelectedOption(option.value)
    setIsOpen(false)
    setRotateIcon(false)
  }

  return (
    <div className="gap-2 flex flex-col w-full">
      {label !== '' && (
        <div className="flex">
          <Body2
            className={`${variant === 'disabled' ? 'text-gray-300' : 'text-white'} flex text-sm leading-[16.94px] font-normal`}
          >
            {label}
          </Body2>
          {required && (
            <>
              &nbsp;
              <Body2
                className={`flex text-sm font-normal ${variant === 'disabled' ? 'text-gray-300' : 'text-error-500'}`}
              >
                *
              </Body2>
            </>
          )}
        </div>
      )}
      <div className="relative w-full" ref={selectRef}>
        <button
          className={`${selectInputVariants({ variant, className })} text-left`}
          onClick={toggleOptions}
          disabled={variant === 'disabled'}
        >
          <Body1>{selectedOption?.label || 'Select'}</Body1>
          {icon && (
            <div
              className={`absolute right-4 top-0 bottom-0 flex items-center transition-transform duration-300 ease-in-out ${rotateIcon ? 'transform rotate-180' : ''}`}
            >
              {<Icon name={icon} width="18" height="18" />}
            </div>
          )}
        </button>
        {isOpen && (
          <div className="absolute left-0 w-full bg-gray-500 rounded-lg">
            <div className="text-white border shadow-lg max-h-[210px] overflow-y-auto rounded-lg">
              {options.map((option) => (
                <div
                  key={option.value}
                  className="px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-400"
                  onClick={() => {
                    handleOptionSelect(option)
                  }}
                >
                  <Body1>{option.label}</Body1>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <HelperText className={textColor}>{helperText}</HelperText>
    </div>
  )
}

export default SelectInput
