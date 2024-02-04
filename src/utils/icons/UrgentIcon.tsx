import { type IconProps } from '@utils/types'

const UrgentIcon = (props: IconProps): JSX.Element => {
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
        d="M7.5 4.5H16.4998L13.7998 14.9997H10.1999L7.5 4.5Z"
        fill={fillColor || '#FEFEFE'}
      />
      <rect
        x="10.5"
        y="16.5"
        width="2.99993"
        height="2.99993"
        fill={fillColor || '#FEFEFE'}
      />
    </svg>
  )
}

export default UrgentIcon
