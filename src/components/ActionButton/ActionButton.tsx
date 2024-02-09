import React from 'react'
import config from '../../../tailwind.config'
import Icon from '@components/Icon/Icon'

export interface ActionButtonProps {
  variant: 'filter' | 'add'
  disabled?: boolean
}

const ActionButton: React.FC<ActionButtonProps> = ({
  variant,
  disabled = false
}): JSX.Element => {
  const colors = config.theme.extend.colors

  const color: string = disabled ? colors.white + '50' : 'white'

  return (
    <div className="flex items-center justify-center bg-gradient rounded-lg w-fit p-px">
      <div className="bg-black">
        <button
          className="flex items-center h-[40px] w-[40px] justify-center p-2 gap-4 rounded-lg bg-white/5 hover:bg-gray-400/90 disabled:cursor-not-allowed disabled:hover:bg-white/5"
          disabled={disabled}
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
