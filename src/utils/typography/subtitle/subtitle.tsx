import React from 'react'
import { type TypographyTypes } from '../typography.types'

const Subtitle: React.FC<TypographyTypes> = ({ className, children }) => {
  return (
    <h4
      className={`font-inter font-medium text-base leading-[17.6px] ${className}`}
    >
      {children}
    </h4>
  )
}

export default Subtitle
