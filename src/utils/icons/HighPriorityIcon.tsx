import { type IconProps } from '@utils/types'

const HighPriorityIcon = (props: IconProps): JSX.Element => {
  const { fillColor, width, height } = props

  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill={fillColor || '#FEFEFE'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="14" width="4" height="6" fill={fillColor || '#FEFEFE'} />
      <rect x="10" y="9" width="4" height="11" fill={fillColor || '#FEFEFE'} />
      <rect x="16" y="4" width="4" height="16" fill={fillColor || '#FEFEFE'} />
    </svg>
  )
}

export default HighPriorityIcon
