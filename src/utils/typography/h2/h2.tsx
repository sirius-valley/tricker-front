import React from 'react'
import { type TypographyTypes } from '../typography.types'

const H2: React.FC<TypographyTypes> = ({ className, children }) => {
  return (
    <h2
      className={`font-inter font-bold text-2xl leading-[26.4px] ${className}`}
    >
      {children}
    </h2>
  )
}

export default H2
