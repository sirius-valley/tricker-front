import React from 'react'
import { type TypographyTypes } from '../typography.types'

const H1: React.FC<TypographyTypes> = ({ className, children }) => {
  return (
    <h1
      className={`font-inter font-bold text-[26px] leading-[28.6px] ${className}`}
    >
      {children}
    </h1>
  )
}

export default H1
