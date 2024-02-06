import { type IconProps } from '@utils/types'

const StopIcon = (props: IconProps): JSX.Element => {
  const { fillColor, width, height } = props

  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill={fillColor || '#FEFEFE'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_494_864)">
        <path d="M6 6H18V18H6V6Z" fill={fillColor || '#FEFEFE'} />
      </g>
      <defs>
        <clipPath id="clip0_494_864">
          <rect width="24" height="24" fill={fillColor || '#FEFEFE'} />
        </clipPath>
      </defs>
    </svg>
  )
}

export default StopIcon
