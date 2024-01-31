import { IconProps } from "@utils/types";

const StopIcon = (props: IconProps) => {
  const { fillColor, width, height } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_494_864)">
        <path d="M6 6H18V18H6V6Z" fill={fillColor} />
      </g>
      <defs>
        <clipPath id="clip0_494_864">
          <rect width="24" height="24" fill={fillColor} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default StopIcon;