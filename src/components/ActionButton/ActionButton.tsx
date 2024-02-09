import React from 'react'
import Icon from '@components/Icon/Icon'
import config from '../../../tailwind.config'

export interface ActionButtonProps {
  icon: 'filter' | 'add'
  disabled?: boolean
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  disabled = false
}): JSX.Element => {
  const colors = config.theme.extend.colors

  const color: string = disabled ? colors.white + '50' : 'white'
  return (
    <div className="bg-gradient rounded-lg w-fit p-px">
      <button
        className="flex items-center justify-center p-2 gap-4 rounded-lg bg-white/5 hover:bg-white/10 disabled:cursor-not-allowed disabled:hover:bg-white/5"
        disabled={disabled}
      >
        <Icon
          name={icon === 'add' ? 'AddTimeIcon' : 'FilterIcon'}
          fillColor={color}
        />
      </button>
    </div>
  )
}

export default ActionButton
