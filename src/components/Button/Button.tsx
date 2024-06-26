import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import Subtitle from '../../utils/typography/subtitle/subtitle'
import config from '../../../tailwind.config'
import Icon from '@components/Icon/Icon'
import type * as icons from '@components/Icon/index.ts'

const colors = config.theme.extend.colors

const buttonVariants = cva(
  [
    'w-fit rounded-xl p-4 gap-2 flex items-center justify-center cursor-pointer',
    'transition-all duration-300 ease-in-out focus:outline-none',
    'disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed'
  ],
  {
    variants: {
      size: {
        large: 'h-[56px]',
        medium: 'h-[42px]'
      },
      variant: {
        filled: ['bg-primary-400 hover:bg-primary-500 text-black'],
        outline: [
          'bg-transparent border border-primary-400 hover:bg-gray-400 text-white'
        ],
        ghost: ['bg-transparent hover:bg-gray-400', 'text-primary-400'],
        error: ['bg-error-500 hover:bg-error-500/60 text-white']
      }
    },
    defaultVariants: {
      size: 'medium',
      variant: 'filled'
    }
  }
)

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  icon?: keyof typeof icons
  disabled?: boolean
  className?: string
  left?: boolean
  right?: boolean
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  variant,
  icon,
  className = '',
  left = false,
  right = false,
  onClick,
  ...props
}) => {
  const buttonClass = buttonVariants({ ...props, variant })

  let iconColor

  if (disabled !== undefined && disabled) {
    iconColor = colors.gray['400']
  } else {
    switch (variant) {
      case 'filled':
        iconColor = colors.black
        break
      case 'outline':
        iconColor = colors.white
        break
      case 'ghost':
        iconColor = colors.primary['400']
        break
      case 'error':
        iconColor = colors.white
        break
      default:
        iconColor = colors.black
    }
  }

  return (
    <button
      className={className + buttonClass + className}
      {...props}
      disabled={disabled}
      onClick={onClick}
    >
      {left && icon && <Icon name={icon} fillColor={iconColor} />}
      <Subtitle>{children}</Subtitle>
      {right && icon && <Icon name={icon} fillColor={iconColor} />}
    </button>
  )
}

export default Button
