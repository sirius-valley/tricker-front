import { type IconProps } from '@utils/types'

const BlockedIcon = (props: IconProps): JSX.Element => {
  const { fillColor, width, height } = props

  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill={fillColor || '#FEFEFE'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_494_865)">
        <path
          d="M14.4 6L14 4H5V21H7V14H12.6L13 16H20V6H14.4Z"
          fill={fillColor || '#FEFEFE'}
        />
      </g>
      <defs>
        <clipPath id="clip0_494_865">
          <rect width="24" height="24" fill={fillColor || '#FEFEFE'} />
        </clipPath>
      </defs>
    </svg>
  )
}

export default BlockedIcon
