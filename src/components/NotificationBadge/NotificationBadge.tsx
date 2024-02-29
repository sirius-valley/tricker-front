import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import Body1 from '@utils/typography/body1/body1'
import { DismissIcon } from '@components/Icon'

const notificationBadgeVariants = cva(
  [
    'flex justify-between items-center gap-2.5 p-6 rounded-xl w-[358px] h-fit text-center shadow-1'
  ],
  {
    variants: {
      variant: {
        default: ['bg-gray-400 text-white'],
        success: ['bg-success-500 text-black'],
        error: ['bg-error-500 text-white'],
        warning: ['bg-warning-500 text-black']
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface NotificationBadgeProps
  extends VariantProps<typeof notificationBadgeVariants>,
    React.HTMLAttributes<HTMLDivElement> {
  handleClose?: () => void
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  className,
  variant,
  children,
  handleClose,
  ...props
}) => {
  let dismissIconColor: string
  switch (variant) {
    case 'error':
    case 'default':
      dismissIconColor = 'white'
      break
    default:
      dismissIconColor = 'black'
  }
  return (
    <div
      className={notificationBadgeVariants({ variant, className })}
      {...props}
    >
      <Body1 className={'text-[14px] leading-[15.4px] text-wrap'}>
        {children}
      </Body1>
      {handleClose && (
        <div className="flex gap-2">
          <div className="w-px h-10 max-h-fit bg-gray-600" />
          <button
            className="hover:bg-gray-300/30 rounded-full p-2"
            onClick={handleClose}
          >
            <DismissIcon fillColor={dismissIconColor} />
          </button>
        </div>
      )}
    </div>
  )
}

export default NotificationBadge
