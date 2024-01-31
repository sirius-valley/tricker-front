import { IconProps } from "@utils/types";

const NoPriorityIcon = (props: IconProps) => {
  const { fillColor, width, height } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 2"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="16" height="2" fill={fillColor} />
    </svg>
  );
};

export default NoPriorityIcon;
