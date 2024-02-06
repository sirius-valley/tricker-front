import { type IconProps } from '@utils/types'

const NoPriorityIcon = (props: IconProps): JSX.Element => {
  const { fillColor, width, height } = props

  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill={fillColor || '#FEFEFE'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="11" width="16" height="2" fill={fillColor || '#FEFEFE'} />
    </svg>
  )
}

export default NoPriorityIcon
