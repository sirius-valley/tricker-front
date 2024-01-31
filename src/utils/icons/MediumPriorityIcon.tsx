import { IconProps } from "@utils/types";

const MediumPriorityIcon = (props: IconProps) => {
  const { fillColor, width, height } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="10" width="4" height="6" fill={fillColor} />
      <rect x="6" y="5" width="4" height="11" fill={fillColor} />
      <rect x="12" width="4" height="16" fill={fillColor} fill-opacity="0.3" />
    </svg>
  );
};

export default MediumPriorityIcon;
