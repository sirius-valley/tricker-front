import '../../index.css'
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import Icon from '@components/Icon/Icon.js'
import { ProfilePicture } from '@components/ProfilePicture/ProfilePicture.js'
import { useUser } from '@redux/hooks'

const navButtonVariants = cva(
  ['flex p-3 gap-2.5 rounded-lg w-14 h-14 items-center justify-center'],
  {
    variants: {
      state: {
        on: ['bg-white/10'],
        off: ['bg-transparent']
      }
    },
    defaultVariants: {
      state: 'off'
    }
  }
)
const iconVariant = (
  variant: string,
  profilePicture?: string,
  userName?: string
): React.ReactElement => {
  switch (variant) {
    case 'profile':
      return (
        <ProfilePicture
          img={profilePicture ?? ''}
          userName={userName ?? ''}
          className="w-8 h-8"
        />
      )
    case 'projects':
      return <Icon name="FolderIcon" width="32px" height="32px" />
    case 'home':
      return <Icon name="HomeIcon" width="32px" height="32px" />
    case 'team':
      return <Icon name="TeamIcon" width="32px" height="32px" />
    case 'stats':
      return <Icon name="ChartDonutIcon" width="32px" height="32px" />
    default:
      return <></>
  }
}

export interface NavButtonProps
  extends VariantProps<typeof navButtonVariants>,
    React.HTMLAttributes<HTMLButtonElement> {
  variant: string
}

export const NavButton: React.FC<NavButtonProps> = ({
  className,
  variant,
  state,
  ...props
}) => {
  const user = useUser()
  return (
    <button className={navButtonVariants({ state, className })} {...props}>
      {iconVariant(variant, user.profileImage, user.name)}
    </button>
  )
}

export default NavButton
