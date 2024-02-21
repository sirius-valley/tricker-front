import { type IconProps } from '@utils/types'

const QuestionIcon = (props: IconProps): JSX.Element => {
  const { fillColor, width, height } = props

  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 16 17"
      fill={fillColor || '#FEFEFE'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.75 11.75C8.75 11.8983 8.70602 12.0433 8.6236 12.1667C8.54119 12.29 8.42406 12.3861 8.28701 12.4429C8.14997 12.4997 7.99917 12.5145 7.85368 12.4856C7.7082 12.4566 7.57456 12.3852 7.46967 12.2803C7.36478 12.1754 7.29335 12.0418 7.26441 11.8963C7.23548 11.7508 7.25033 11.6 7.30709 11.463C7.36386 11.3259 7.45999 11.2088 7.58333 11.1264C7.70666 11.044 7.85167 11 8 11C8.19892 11 8.38968 11.079 8.53033 11.2197C8.67098 11.3603 8.75 11.5511 8.75 11.75ZM8 5C6.62125 5 5.5 6.00938 5.5 7.25V7.5C5.5 7.63261 5.55268 7.75979 5.64645 7.85355C5.74022 7.94732 5.86739 8 6 8C6.13261 8 6.25979 7.94732 6.35356 7.85355C6.44732 7.75979 6.5 7.63261 6.5 7.5V7.25C6.5 6.5625 7.17313 6 8 6C8.82688 6 9.5 6.5625 9.5 7.25C9.5 7.9375 8.82688 8.5 8 8.5C7.86739 8.5 7.74022 8.55268 7.64645 8.64645C7.55268 8.74021 7.5 8.86739 7.5 9V9.5C7.5 9.63261 7.55268 9.75979 7.64645 9.85355C7.74022 9.94732 7.86739 10 8 10C8.13261 10 8.25979 9.94732 8.35356 9.85355C8.44732 9.75979 8.5 9.63261 8.5 9.5V9.455C9.64 9.24563 10.5 8.33625 10.5 7.25C10.5 6.00938 9.37875 5 8 5ZM14.5 8.5C14.5 9.78558 14.1188 11.0423 13.4046 12.1112C12.6903 13.1801 11.6752 14.0132 10.4874 14.5052C9.29973 14.9972 7.99279 15.1259 6.73192 14.8751C5.47104 14.6243 4.31285 14.0052 3.40381 13.0962C2.49477 12.1872 1.8757 11.029 1.6249 9.76809C1.37409 8.50721 1.50282 7.20028 1.99479 6.01256C2.48676 4.82484 3.31988 3.80968 4.3888 3.09545C5.45772 2.38122 6.71442 2 8 2C9.72335 2.00182 11.3756 2.68722 12.5942 3.90582C13.8128 5.12441 14.4982 6.77665 14.5 8.5ZM13.5 8.5C13.5 7.4122 13.1774 6.34883 12.5731 5.44436C11.9687 4.53989 11.1098 3.83494 10.1048 3.41866C9.09977 3.00238 7.9939 2.89346 6.92701 3.10568C5.86011 3.3179 4.8801 3.84172 4.11092 4.61091C3.34173 5.3801 2.8179 6.36011 2.60568 7.427C2.39347 8.4939 2.50238 9.59977 2.91867 10.6048C3.33495 11.6098 4.0399 12.4687 4.94437 13.0731C5.84884 13.6774 6.91221 14 8 14C9.45819 13.9983 10.8562 13.4184 11.8873 12.3873C12.9184 11.3562 13.4983 9.95818 13.5 8.5Z"
        fill={fillColor || '#FEFEFE'}
      />
    </svg>
  )
}

export default QuestionIcon
