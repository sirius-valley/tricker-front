import React from 'react'

export interface SquaredIconButtonProps {
  icon?: React.ReactNode
  className?: string
}

const SquaredIconButton: React.FC<SquaredIconButtonProps> = ({
  className,
  icon,
  ...props
}) => {
  const IconComponent = React.cloneElement(icon as React.ReactElement, {
    width: '32px',
    height: '32px'
  })

  return (
    <button
      className={`bg-white/30 border-gray-500 border w-12 h-12 p-2 rounded-lg flex items-center justify-center cursor-pointer ${className}`}
      {...props}
    >
      {IconComponent}
    </button>
  )
}

export default SquaredIconButton
