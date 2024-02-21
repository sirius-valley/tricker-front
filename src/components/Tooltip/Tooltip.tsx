import React from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { v4 as uuidv4 } from 'uuid'
import config from '../../../tailwind.config'

export interface TooltipProps {
  children: React.ReactNode
  content: string
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const tooltipId = uuidv4()
  const colors = config.theme.extend.colors

  return (
    <>
      <a
        data-tooltip-id={tooltipId}
        data-tooltip-content={content}
        className="flex w-fit"
      >
        {children}
      </a>
      <ReactTooltip
        id={tooltipId}
        style={{
          backgroundColor: colors.white,
          opacity: 1,
          color: colors.black,
          fontFamily: 'Inter',
          fontSize: '12px',
          fontWeight: 400,
          padding: '8px',
          maxWidth: '280px',
          textAlign: 'center',
          borderRadius: '4px'
        }}
      />
    </>
  )
}
