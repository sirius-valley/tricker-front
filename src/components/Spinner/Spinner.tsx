import React from 'react'

export interface SpinnerProps {
  variant: 'primary' | 'secondary'
  size: number
}

const Spinner: React.FC<SpinnerProps> = ({ variant, size = 100 }) => {
  return (
    <div
      style={{ height: size, width: size }}
      className={`ms-auto inline-block animate-spin rounded-full border-4 border-solid border-${variant}-400 border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    ></div>
  )
}

export default Spinner
