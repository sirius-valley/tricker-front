import { type IconProps } from '@utils/types'

const DeclineIcon = (props: IconProps): JSX.Element => {
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
        d="M13 0.5C10.4288 0.5 7.91543 1.26244 5.77759 2.6909C3.63975 4.11935 1.97351 6.14968 0.989572 8.52512C0.0056327 10.9006 -0.251811 13.5144 0.249797 16.0362C0.751405 18.5579 1.98953 20.8743 3.80762 22.6924C5.6257 24.5105 7.94208 25.7486 10.4638 26.2502C12.9856 26.7518 15.5995 26.4944 17.9749 25.5104C20.3503 24.5265 22.3807 22.8603 23.8091 20.7224C25.2376 18.5846 26 16.0712 26 13.5C25.9964 10.0533 24.6256 6.74882 22.1884 4.31163C19.7512 1.87445 16.4467 0.50364 13 0.5ZM18.7075 11.2075L11.7075 18.2075C11.6146 18.3005 11.5043 18.3742 11.3829 18.4246C11.2615 18.4749 11.1314 18.5008 11 18.5008C10.8686 18.5008 10.7385 18.4749 10.6171 18.4246C10.4957 18.3742 10.3854 18.3005 10.2925 18.2075L7.29251 15.2075C7.10486 15.0199 6.99945 14.7654 6.99945 14.5C6.99945 14.2346 7.10486 13.9801 7.29251 13.7925C7.48015 13.6049 7.73464 13.4994 8.00001 13.4994C8.26537 13.4994 8.51987 13.6049 8.70751 13.7925L11 16.0863L17.2925 9.7925C17.3854 9.69959 17.4957 9.62589 17.6171 9.57561C17.7385 9.52532 17.8686 9.49944 18 9.49944C18.1314 9.49944 18.2615 9.52532 18.3829 9.57561C18.5043 9.62589 18.6146 9.69959 18.7075 9.7925C18.8004 9.88541 18.8741 9.99571 18.9244 10.1171C18.9747 10.2385 19.0006 10.3686 19.0006 10.5C19.0006 10.6314 18.9747 10.7615 18.9244 10.8829C18.8741 11.0043 18.8004 11.1146 18.7075 11.2075Z"
        fill={fillColor || '#A4F572'}
      />
    </svg>
  )
}

export default DeclineIcon
