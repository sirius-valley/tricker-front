import { IconProps } from "@utils/types";

const AddTimeIcon = (props: IconProps) => {
  const { fillColor, width, height } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_494_867)">
        <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill={fillColor} />
      </g>
      <defs>
        <clipPath id="clip0_494_867">
          <rect width="24" height="24" fill={fillColor} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AddTimeIcon;
