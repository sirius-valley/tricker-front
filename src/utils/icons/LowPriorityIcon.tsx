import { IconProps } from "@utils/types";

const LowPriorityIcon = (props: IconProps) => {
  const { fillColor, width, height } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 10H4V16H0V10Z" fill={fillColor} />
      <path d="M6 5H10V16H6V5Z" fill={fillColor} fill-opacity="0.3" />
      <path d="M12 0H16V16H12V0Z" fill={fillColor} fill-opacity="0.3" />
    </svg>
  );
};

export default LowPriorityIcon;
