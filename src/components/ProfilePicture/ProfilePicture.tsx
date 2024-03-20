import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const profilePictureVariants = cva(['p-0.5 rounded-[40px] object-cover'], {
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
})

interface ProfilePictureProps
  extends VariantProps<typeof profilePictureVariants>,
    React.HTMLAttributes<HTMLImageElement> {
  className?: string
  img?: string
  border?: boolean
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  className,
  img = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  border = false,
  size = 'sm'
}) => {
  return (
    <img
      src={img}
      alt="User's profile picture"
      className={`${profilePictureVariants({ size, className })} bg-${border ? 'gradient' : 'transparent'} ${className}`}
    />
  )
}
