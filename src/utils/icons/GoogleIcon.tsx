import { type IconProps } from '@utils/types'

const GoogleIcon = (props: IconProps): JSX.Element => {
  const { width, height } = props

  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1571_12876)">
        <path
          d="M20.3442 12.1842C20.3442 11.6403 20.3001 11.0936 20.206 10.5586H12.6602V13.6392H16.9813C16.802 14.6328 16.2258 15.5117 15.3822 16.0703V18.0692H17.9602C19.4741 16.6758 20.3442 14.6181 20.3442 12.1842Z"
          fill="#9357F7"
        />
        <path
          d="M12.6607 20.0007C14.8184 20.0007 16.6379 19.2923 17.9637 18.0694L15.3857 16.0705C14.6684 16.5585 13.7425 16.8348 12.6637 16.8348C10.5766 16.8348 8.80696 15.4268 8.17202 13.5337H5.51172V15.5943C6.86979 18.2958 9.63592 20.0007 12.6607 20.0007Z"
          fill="#34A853"
        />
        <path
          d="M8.16852 13.5333C7.83341 12.5397 7.83341 11.4639 8.16852 10.4703V8.40967H5.51116C4.37649 10.6702 4.37649 13.3334 5.51116 15.5939L8.16852 13.5333Z"
          fill="#FBBC04"
        />
        <path
          d="M12.6607 7.16644C13.8013 7.1488 14.9036 7.57798 15.7296 8.36578L18.0136 6.08174C16.5674 4.72367 14.6479 3.97702 12.6607 4.00054C9.63592 4.00054 6.86979 5.70548 5.51172 8.40987L8.16908 10.4705C8.80108 8.57449 10.5736 7.16644 12.6607 7.16644Z"
          fill="#EA4335"
        />
      </g>
      <defs>
        <clipPath id="clip0_1571_12876">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(4.5 4)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default GoogleIcon