import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import Body1 from '@utils/typography/body1/body1'
import config from '../../../tailwind.config.js'

const colors = config.theme.extend.colors

const navbarItemVariants = cva(
  ['flex p-[8px] gap-[8px] w-[184px] max-h-fit  items-center'],
  {
    variants: {
      variant: {
        default: [
          'text-white cursor-pointer',
          'hover:bg-primary-400 hover:bg-opacity-5 hover:rounded-[8px]'
        ],
        selected: ['text-primary-400'],
        disabled: ['text-gray-400', 'cursor-not-allowed']
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface NavbarItemProps
  extends VariantProps<typeof navbarItemVariants>,
    React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
}

export const NavbarItem: React.FC<NavbarItemProps> = ({
  className,
  variant,
  icon,
  children,
  ...props
}) => {
  let iconColor
  switch (variant) {
    case 'selected':
      iconColor = colors.primary['400']
      break
    case 'disabled':
      iconColor = colors.gray['400']
      break
    default:
      iconColor = colors.white
  }

  // Done like this so the icon can be passed as a prop and can have the same color as the text
  const IconComponent = React.cloneElement(icon as React.ReactElement, {
    fillColor: iconColor
  })

  return (
    <div className={navbarItemVariants({ variant, className })} {...props}>
      {IconComponent}
      <Body1>{children}</Body1>
    </div>
  )
}
