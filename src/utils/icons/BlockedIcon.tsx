import { IconProps } from "@utils/types";

const BlockedIcon = (props: IconProps) => {
  const { fillColor, width, height } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 17"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.4 2L9 0H0V17H2V10H7.6L8 12H15V2H9.4Z" fill={fillColor} />
    </svg>
  );
};

export default BlockedIcon;
