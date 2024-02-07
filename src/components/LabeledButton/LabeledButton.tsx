import React from 'react'
import type * as icons from '@components/Icon/index'
import Icon from '@components/Icon/Icon'
import Body1 from '@utils/typography/body1/body1'

export interface LabeledButtonProps {
  icon?: keyof typeof icons
  label?: string
  disabled?: boolean
}

const LabeledButton: React.FC<LabeledButtonProps> = ({
  icon,
  label,
  disabled = false
}): JSX.Element => {
  const color: string = disabled ? 'white/50' : 'white'
  return (
    <button
      className="flex items-center justify-center py-1 px-2 gap-4 border border-white/30 rounded bg-white/5 hover:bg-white/10 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      {icon && (
        <Icon name={icon} width="20px" height="20px" fillColor={color} />
      )}
      {label && (
        <Body1 className={`leading-[19.36px] capitalize text-${color}`}>
          {label}
        </Body1>
      )}
    </button>
  )
}

export default LabeledButton
