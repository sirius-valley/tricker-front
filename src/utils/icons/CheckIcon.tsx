import { IconProps } from "@utils/types";

const CheckIcon = (props: IconProps) => {
  const { fillColor, width, height } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_494_876)">
        <path
          d="M8.99991 16.1698L4.82991 11.9998L3.40991 13.4098L8.99991 18.9998L20.9999 6.99984L19.5899 5.58984L8.99991 16.1698Z"
          fill={fillColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_494_876">
          <rect width="24" height="24" fill={fillColor} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CheckIcon;
