import { type IconProps } from '@utils/types'

const EnvelopeIcon = (props: IconProps): JSX.Element => {
  const { fillColor, width, height } = props

  return (
    <svg
      width={width || '20'}
      height={height || '20'}
      viewBox="0 0 20 20"
      fill={fillColor || 'white'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.7308 4.1665H3.26923C2.125 4.1665 1.25 5.0091 1.25 6.11095V13.8887C1.25 14.9906 2.125 15.8332 3.26923 15.8332H16.7308C17.875 15.8332 18.75 14.9906 18.75 13.8887V6.11095C18.75 5.0091 17.875 4.1665 16.7308 4.1665ZM17.2692 14.148L12.0192 10.5184L10 11.8147L7.91346 10.5184L2.73077 14.148L6.97115 9.93502L1.78846 6.04613L10 10.3239L18.1442 6.11095L13.0288 9.99984L17.2692 14.148Z"
        fill={fillColor || 'white'}
      />
    </svg>
  )
}

export default EnvelopeIcon
