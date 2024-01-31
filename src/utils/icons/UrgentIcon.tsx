import { IconProps } from "@utils/types";

const UrgentIcon = (props: IconProps) => {
  const { fillColor, width, height } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 4.5H16.4998L13.7998 14.9997H10.1999L7.5 4.5Z"
        fill={fillColor}
      />
      <rect
        x="10.5"
        y="16.5"
        width="2.99993"
        height="2.99993"
        fill={fillColor}
      />
    </svg>
  );
};

export default UrgentIcon;
