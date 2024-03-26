import { type IconProps } from '@utils/types'

const SubstractTimeIcon = (props: IconProps): JSX.Element => {
  const { fillColor, width, height } = props

  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 28 28"
      fill={fillColor || '#FEFEFE'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.1668 15.1667H15.1668H14.5835H13.4168H12.8335H5.8335V12.8333H12.8335H13.4168H14.0002H15.1668H22.1668V15.1667Z"
        fill={fillColor || '#FEFEFE'}
      />
    </svg>
  )
}

export default SubstractTimeIcon
