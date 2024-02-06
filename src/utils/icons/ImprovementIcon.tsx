import { type IconProps } from '@utils/types'

const ImprovementIcon = (props: IconProps): JSX.Element => {
  const { fillColor, width, height } = props

  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill={fillColor || '#FEFEFE'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_494_877)">
        <path
          d="M20.9545 11.1159C19.3435 11.0889 17.6246 9.36098 18.5426 7.31804C15.8606 8.21802 13.3497 5.88708 13.8717 3.21416C7.45487 1.8642 3 7.14705 3 12.0249C3 16.9928 7.03189 21.0247 11.9997 21.0247C17.3006 21.0247 21.4855 16.4528 20.9545 11.1159ZM8.84984 14.7248C8.10286 14.7248 7.49987 14.1219 7.49987 13.3749C7.49987 12.6279 8.10286 12.0249 8.84984 12.0249C9.59681 12.0249 10.1998 12.6279 10.1998 13.3749C10.1998 14.1219 9.59681 14.7248 8.84984 14.7248ZM10.6498 10.225C9.90281 10.225 9.29982 9.62198 9.29982 8.875C9.29982 8.12802 9.90281 7.52504 10.6498 7.52504C11.3968 7.52504 11.9997 8.12802 11.9997 8.875C11.9997 9.62198 11.3968 10.225 10.6498 10.225ZM14.6997 15.6248C14.2047 15.6248 13.7997 15.2198 13.7997 14.7248C13.7997 14.2298 14.2047 13.8249 14.6997 13.8249C15.1947 13.8249 15.5996 14.2298 15.5996 14.7248C15.5996 15.2198 15.1947 15.6248 14.6997 15.6248Z"
          fill={fillColor || '#FEFEFE'}
        />
      </g>
      <defs>
        <clipPath id="clip0_494_877">
          <rect width="24" height="24" fill={fillColor || '#FEFEFE'} />
        </clipPath>
      </defs>
    </svg>
  )
}

export default ImprovementIcon
