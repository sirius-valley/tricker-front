import { IconProps } from "@utils/types";

const LowPriorityIcon = (props: IconProps) => {
  const { fillColor, width, height } = props;

  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill={fillColor || "#FEFEFE"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 14H8V20H4V14Z" fill={fillColor || "#FEFEFE"} />
      <path d="M10 9H14V20H10V9Z" fill={fillColor || "#FEFEFE"} fill-opacity="0.3" />
      <path d="M16 4H20V20H16V4Z" fill={fillColor || "#FEFEFE"} fill-opacity="0.3" />
    </svg>
  );
};

export default LowPriorityIcon;
