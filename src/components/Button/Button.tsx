import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import Subtitle from '../../utils/typography/subtitle/subtitle'
import config from '../../../tailwind.config'

const colors = config.theme.extend.colors

const buttonVariants = cva(
  [
    'rounded-xl p-2 gap-2 flex items-center justify-center cursor-pointer',
    'transition-all duration-300 ease-in-out focus:outline-none',
    'disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed'
  ],
  {
    variants: {
      size: {
        large: 'w-[170px] h-[56px]',
        medium: 'w-[170px] h-[42px]'
      },
      variant: {
        filled: ['bg-primary-400 hover:bg-primary-500', 'text-black'],
        outline: [
          'bg-transparent border border-primary-400 hover:bg-gray-400',
          'text-white'
        ],
        ghost: ['bg-transparent hover:bg-gray-400', 'text-primary-400']
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
  icon?: React.ReactNode
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  variant,
  icon,
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
      default:
        iconColor = colors.black
    }
  }

  const IconComponent = React.cloneElement(icon as React.ReactElement, {
    fillColor: iconColor,
    width: '24px',
    height: '24px'
  })

  return (
    <button
      className={buttonClass}
      {...props}
      disabled={disabled}
    >
      {IconComponent}
      <Subtitle>{children}</Subtitle>
      {IconComponent}
    </button>
  )
}

export default Button;
