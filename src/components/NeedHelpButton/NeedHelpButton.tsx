import React from 'react'
import Icon from '../Icon/Icon'
import Subtitle from '../../utils/typography/subtitle/subtitle'
import config from '../../../tailwind.config.js'

const colors = config.theme.extend.colors

export const NeedHelpButton: React.FC = () => {
  return (
    <a
      href={'mailto:ignacioferrari@sirius.com.ar'}
      className="flex items-center gap-2 text-white w-[113px] h-[22px] border-b border-transparent hover:border-gray-300 transition-all"
    >
      <Icon
        name="EnvelopeIcon"
        width="20"
        height="20"
        fillColor={colors.primary[500]}
      />
      <Subtitle className="text-gray-300 text-sm">¿Need Help?</Subtitle>
    </a>
  )
}
