import React from 'react'
import Icon from '@components/Icon/Icon'
import type * as icons from '@components/Icon/index.ts'
import Subtitle from '@utils/typography/subtitle/subtitle'

interface LoginWithButtonProps {
  title: string
  iconName: keyof typeof icons
  redirectUrl: string
}

export const LoginWithButton: React.FC<LoginWithButtonProps> = ({
  title,
  iconName,
  redirectUrl
}) => {
  return (
    <a
      href={redirectUrl}
      className="flex items-center gap-2 justify-center p-4 h-[48px]  border border-primary-400 rounded-xl text-white w-fit hover:bg-primary-400/10 transition-colors duration-200"
    >
      <Icon name={iconName} width="24" height="24" />
      <Subtitle className="text-white">{title}</Subtitle>
    </a>
  )
}
