import { type IconProps } from '@utils/types'

const GraphFilterIcon = (props: IconProps): JSX.Element => {
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
        d="M13.0477 13.3333H18.2858C18.5636 13.3333 18.8301 13.4738 19.0266 13.7239C19.223 13.9739 19.3334 14.313 19.3334 14.6667C19.3334 15.0203 19.223 15.3594 19.0266 15.6095C18.8301 15.8595 18.5636 16 18.2858 16H13.0477C12.7699 16 12.5034 15.8595 12.3069 15.6095C12.1105 15.3594 12.0001 15.0203 12.0001 14.6667C12.0001 14.313 12.1105 13.9739 12.3069 13.7239C12.5034 13.4738 12.7699 13.3333 13.0477 13.3333ZM5.71437 8H18.2858C18.5636 8 18.8301 8.14048 19.0266 8.39052C19.223 8.64057 19.3334 8.97971 19.3334 9.33333C19.3334 9.68696 19.223 10.0261 19.0266 10.2761C18.8301 10.5262 18.5636 10.6667 18.2858 10.6667H5.71437C5.43652 10.6667 5.17006 10.5262 4.97359 10.2761C4.77712 10.0261 4.66675 9.68696 4.66675 9.33333C4.66675 8.97971 4.77712 8.64057 4.97359 8.39052C5.17006 8.14048 5.43652 8 5.71437 8Z"
        fill={fillColor || '#FEFEFE'}
      />
    </svg>
  )
}

export default GraphFilterIcon
