import { type IconProps } from '@utils/types'

const FeatureIcon = (props: IconProps): JSX.Element => {
  const { fillColor, width, height } = props

  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill={fillColor || '#FEFEFE'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.0001 21H10.0001L11.0001 14H7.50011C6.92011 14 6.93011 13.68 7.12011 13.34C7.31011 13 7.17011 13.26 7.19011 13.22C8.48011 10.94 10.4201 7.54 13.0001 3H14.0001L13.0001 10H16.5001C16.9901 10 17.0601 10.33 16.9701 10.51L16.9001 10.66C12.9601 17.55 11.0001 21 11.0001 21Z"
        fill={fillColor || '#FEFEFE'}
      />
    </svg>
  )
}

export default FeatureIcon
