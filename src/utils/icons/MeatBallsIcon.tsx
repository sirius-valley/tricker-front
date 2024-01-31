import { IconProps } from "@utils/types";

const MeatBallsIcon = (props: IconProps) => {
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
        d="M13.125 12C13.125 12.2225 13.059 12.44 12.9354 12.625C12.8118 12.81 12.6361 12.9542 12.4305 13.0394C12.225 13.1245 11.9988 13.1468 11.7805 13.1034C11.5623 13.06 11.3618 12.9528 11.2045 12.7955C11.0472 12.6382 10.94 12.4377 10.8966 12.2195C10.8532 12.0012 10.8755 11.775 10.9606 11.5695C11.0458 11.3639 11.19 11.1882 11.375 11.0646C11.56 10.941 11.7775 10.875 12 10.875C12.2984 10.875 12.5845 10.9935 12.7955 11.2045C13.0065 11.4155 13.125 11.7016 13.125 12ZM18.375 10.875C18.1525 10.875 17.935 10.941 17.75 11.0646C17.565 11.1882 17.4208 11.3639 17.3356 11.5695C17.2505 11.775 17.2282 12.0012 17.2716 12.2195C17.315 12.4377 17.4222 12.6382 17.5795 12.7955C17.7368 12.9528 17.9373 13.06 18.1555 13.1034C18.3738 13.1468 18.6 13.1245 18.8055 13.0394C19.0111 12.9542 19.1868 12.81 19.3104 12.625C19.434 12.44 19.5 12.2225 19.5 12C19.5 11.7016 19.3815 11.4155 19.1705 11.2045C18.9595 10.9935 18.6734 10.875 18.375 10.875ZM5.625 10.875C5.4025 10.875 5.18499 10.941 4.99998 11.0646C4.81498 11.1882 4.67078 11.3639 4.58564 11.5695C4.50049 11.775 4.47821 12.0012 4.52162 12.2195C4.56503 12.4377 4.67217 12.6382 4.82951 12.7955C4.98684 12.9528 5.1873 13.06 5.40552 13.1034C5.62375 13.1468 5.84995 13.1245 6.05552 13.0394C6.26109 12.9542 6.43679 12.81 6.5604 12.625C6.68402 12.44 6.75 12.2225 6.75 12C6.75 11.7016 6.63147 11.4155 6.4205 11.2045C6.20952 10.9935 5.92337 10.875 5.625 10.875Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default MeatBallsIcon;
