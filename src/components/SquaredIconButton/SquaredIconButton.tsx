import React from 'react'

export interface SquaredIconButtonProps {
  icon?: React.ReactNode
  isMobile?: boolean
  className?: string
}

const SquaredIconButton: React.FC<SquaredIconButtonProps> = ({
  className,
  icon,
  isMobile = false,
  ...props
}) => {
  const IconComponent = React.cloneElement(
    icon as React.ReactElement,
    isMobile
      ? {
          width: '24px',
          height: '24px'
        }
      : {
          width: '20px',
          height: '20px'
        }
  )

  return (
    <button
      className={`hover:bg-white/15 active:bg-white/10 bg-white/5 border-white/30 border ${isMobile ? 'p-2 rounded-lg' : 'p-1 rounded'} flex items-center justify-center cursor-pointer ${className}`}
      {...props}
    >
      {IconComponent}
    </button>
  )
}

export default SquaredIconButton
