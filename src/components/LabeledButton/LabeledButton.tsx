import React from 'react'
import type * as icons from '@components/Icon/index'
import Icon from '@components/Icon/Icon'
import Body1 from '@utils/typography/body1/body1'
import config from '../../../tailwind.config'

export interface LabeledButtonProps {
  iconName?: keyof typeof icons
  label?: string
  disabled?: boolean
}

const LabeledButton: React.FC<LabeledButtonProps> = ({
  iconName,
  label,
  disabled = false
}): JSX.Element => {
  const colors = config.theme.extend.colors

  const color: string = disabled ? colors.white + '50' : 'white'
  return (
    <button
      className="flex items-center justify-center py-1 px-2 gap-2 border border-white/30 rounded bg-white/5 hover:bg-white/10 disabled:cursor-not-allowed disabled:hover:bg-white/5"
      disabled={disabled}
    >
      {iconName && (
        <Icon name={iconName} width="20px" height="20px" fillColor={color} />
      )}
      {label && (
        <Body1
          className={`leading-[19.36px] capitalize text-white ${disabled && 'opacity-50'}`}
        >
          {label}
        </Body1>
      )}
    </button>
  )
}

export default LabeledButton
