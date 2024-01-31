import { IconProps } from "@utils/types";

const HamburgerIcon = (props: IconProps) => {
  const { fillColor, width, height } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_494_859)">
        <path
          d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"
          fill={fillColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_494_859">
          <rect width="24" height="24" fill={fillColor} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default HamburgerIcon;
