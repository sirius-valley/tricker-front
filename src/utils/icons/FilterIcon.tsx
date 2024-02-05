import { type IconProps } from '@utils/types'

const FilterIcon = (props: IconProps): JSX.Element => {
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
        d="M17.625 12C17.625 12.1658 17.5592 12.3247 17.4419 12.4419C17.3247 12.5592 17.1658 12.625 17 12.625H7C6.83424 12.625 6.67527 12.5592 6.55806 12.4419C6.44085 12.3247 6.375 12.1658 6.375 12C6.375 11.8342 6.44085 11.6753 6.55806 11.5581C6.67527 11.4408 6.83424 11.375 7 11.375H17C17.1658 11.375 17.3247 11.4408 17.4419 11.5581C17.5592 11.6753 17.625 11.8342 17.625 12ZM20.125 7.625H3.875C3.70924 7.625 3.55027 7.69085 3.43306 7.80806C3.31585 7.92527 3.25 8.08424 3.25 8.25C3.25 8.41576 3.31585 8.57473 3.43306 8.69194C3.55027 8.80915 3.70924 8.875 3.875 8.875H20.125C20.2908 8.875 20.4497 8.80915 20.5669 8.69194C20.6842 8.57473 20.75 8.41576 20.75 8.25C20.75 8.08424 20.6842 7.92527 20.5669 7.80806C20.4497 7.69085 20.2908 7.625 20.125 7.625ZM13.875 15.125H10.125C9.95924 15.125 9.80027 15.1908 9.68306 15.3081C9.56585 15.4253 9.5 15.5842 9.5 15.75C9.5 15.9158 9.56585 16.0747 9.68306 16.1919C9.80027 16.3092 9.95924 16.375 10.125 16.375H13.875C14.0408 16.375 14.1997 16.3092 14.3169 16.1919C14.4342 16.0747 14.5 15.9158 14.5 15.75C14.5 15.5842 14.4342 15.4253 14.3169 15.3081C14.1997 15.1908 14.0408 15.125 13.875 15.125Z"
        fill={fillColor || '#FEFEFE'}
      />
    </svg>
  )
}

export default FilterIcon
