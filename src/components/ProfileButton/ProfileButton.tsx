import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const profileButtonVariants = cva(
  ['p-0.5 rounded-[40px] cursor-pointer object-cover'],
  {
    variants: {
      size: {
        sm: ['w-7 h-7'],
        md: ['w-9 h-9'],
        lg: ['w-12 h-12']
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

interface ProfileButtonProps
  extends VariantProps<typeof profileButtonVariants>,
    React.HTMLAttributes<HTMLImageElement> {
  className?: string
  img: string
  border?: boolean
  onClick?: () => void
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({
  className = '',
  img,
  border = false,
  size = 'sm',
  onClick
}) => {
  return (
    <button onClick={onClick}>
      <img
        src={img}
        alt="User's profile picture"
        className={`${profileButtonVariants({ size, className })} bg-${border ? 'gradient' : 'transparent'} ${className}`}
      />
    </button>
  )
}
