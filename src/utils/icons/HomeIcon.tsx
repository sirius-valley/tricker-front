import { IconProps } from "@utils/types";

const HomeIcon = (props: IconProps) => {
  const { fillColor, width, height } = props;

  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill={fillColor || "#FEFEFE"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_494_862)">
        <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill={fillColor || "#FEFEFE"} />
      </g>
      <defs>
        <clipPath id="clip0_494_862">
          <rect width="24" height="24" fill={fillColor || "#FEFEFE"} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default HomeIcon;
