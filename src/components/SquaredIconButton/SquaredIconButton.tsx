import React from 'react'

export interface SquaredIconButtonProps {
  icon?: React.ReactNode
  onClick: () => void
  isMobile?: boolean
  className?: string
  style?: React.CSSProperties
}

const SquaredIconButton: React.FC<SquaredIconButtonProps> = ({
  className,
  icon,
  onClick,
  isMobile = false,
  ...props
}) => {
  const IconComponent = React.cloneElement(
    icon as React.ReactElement,
    isMobile
      ? {
          width: '20px',
          height: '20px'
        }
      : {
          width: '20px',
          height: '20px'
        }
  )

  return (
    <button
      className={`${className} hover:bg-white/15 active:bg-white/10 bg-white/5  border ${isMobile ? 'p-2 rounded-lg border-white' : 'p-1 rounded border-white/30'} flex items-center justify-center cursor-pointer`}
      onClick={onClick}
      {...props}
    >
      {IconComponent}
    </button>
  )
}

export default SquaredIconButton
