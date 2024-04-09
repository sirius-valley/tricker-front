import React from 'react'

export interface SpinnerProps {
  variant: 'primary' | 'secondary' | 'black'
  size: number
}

const Spinner: React.FC<SpinnerProps> = ({ variant, size = 100 }) => {
  let variantStyle
  switch (variant) {
    case 'primary':
      variantStyle = 'border-primary-400'
      break
    case 'secondary':
      variantStyle = 'border-secondary-400'
      break
    case 'black':
      variantStyle = 'border-black'
      break
  }
  return (
    <div className="w-fit h-fit">
      <div
        style={{ height: size, width: size }}
        className={`ms-auto inline-block animate-spin rounded-full border-4 border-solid ${variantStyle} border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      ></div>
    </div>
  )
}

export default Spinner
