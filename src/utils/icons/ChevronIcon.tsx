import { type IconProps } from '@utils/types'

const ChevronIcon = (props: IconProps): JSX.Element => {
  const { fillColor, width, height } = props

  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill={fillColor || '#FEFEFE'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_494_858)">
        <path
          d="M11.9999 5.83L15.1699 9L16.5799 7.59L11.9999 3L7.40991 7.59L8.82991 9L11.9999 5.83ZM11.9999 18.17L8.82991 15L7.41991 16.41L11.9999 21L16.5899 16.41L15.1699 15L11.9999 18.17Z"
          fill={fillColor || '#FEFEFE'}
        />
      </g>
      <defs>
        <clipPath id="clip0_494_858">
          <rect width="24" height="24" fill={fillColor || '#FEFEFE'} />
        </clipPath>
      </defs>
    </svg>
  )
}

export default ChevronIcon
