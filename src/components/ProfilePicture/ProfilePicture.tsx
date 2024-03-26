import NoAvatarProject from '@components/NoAvatar/NoAvatarProject'
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
  img: string
  border?: boolean
  userName: string
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  className,
  img,
  border = false,
  size = 'sm',
  userName
}) => {
  return img ? (
    <img
      src={img}
      alt="User's profile picture"
      className={`${profilePictureVariants({ size, className })} bg-${border ? 'gradient' : 'transparent'} ${className}`}
    />
  ) : (
    <NoAvatarProject
      text={userName}
      className={`${profilePictureVariants({ size, className })} ${className}`}
    />
  )
}
