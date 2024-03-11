import React from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { v4 as uuidv4 } from 'uuid'
import config from '../../../tailwind.config'
import Icon from '@components/Icon/Icon'
import type * as icons from '@components/Icon/index.ts'

export interface TooltipProps {
  iconName?: keyof typeof icons
  iconWidth?: string
  iconHeight?: string
  content: string
}

export const Tooltip: React.FC<TooltipProps> = ({
  iconName,
  content,
  iconWidth,
  iconHeight
}) => {
  const tooltipId = uuidv4()
  const colors = config.theme.extend.colors

  return (
    <>
      <a
        data-tooltip-id={tooltipId}
        data-tooltip-content={content}
        className="flex w-fit cursor-pointer"
      >
        <Icon
          name={iconName || 'QuestionIcon'}
          width={iconWidth}
          height={iconHeight}
        />
      </a>
      <ReactTooltip
        id={tooltipId}
        style={{
          backgroundColor: colors.white,
          color: 'black',
          fontFamily: 'Inter',
          fontSize: '12px',
          fontWeight: 500,
          padding: '8px',
          maxWidth: '280px',
          textAlign: 'center',
          borderRadius: '4px',
          lineHeight: '14.5px'
        }}
      />
    </>
  )
}
