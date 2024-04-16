import React from 'react'
import config from '../../../tailwind.config'
import Icon from '@components/Icon/Icon'

export interface ActionButtonProps {
  variant: 'filter' | 'add'
  disabled?: boolean
  onClick?: () => void
}

const ActionButton: React.FC<ActionButtonProps> = ({
  variant,
  disabled = false,
  onClick
}): JSX.Element => {
  const colors = config.theme.extend.colors

  const color: string = disabled ? colors.white + '50' : 'white'

  return (
    <div
      className={`bg-${disabled ? 'gray-400' : 'transparent border border-white/30'} rounded-lg`}
    >
      <div className="flex justify-center items-center bg-gray-600 rounded-lg">
        <button
          className="flex items-center justify-center p-2 gap-4 rounded-lg bg-white/5 hover:bg-gray-400/90 disabled:cursor-not-allowed disabled:hover:bg-white/5"
          disabled={disabled}
          onClick={onClick}
        >
          <Icon
            name={variant === 'add' ? 'AddTimeIcon' : 'FilterIcon'}
            fillColor={color}
          />
        </button>
      </div>
    </div>
  )
}

export default ActionButton
