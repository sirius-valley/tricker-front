import { IconProps } from "@utils/types";

const PlayIcon = (props: IconProps) => {
  const { fillColor, width, height } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_494_860)">
        <path d="M8 5V19L19 12L8 5Z" fill={fillColor} />
      </g>
      <defs>
        <clipPath id="clip0_494_860">
          <rect width="24" height="24" fill={fillColor} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PlayIcon;