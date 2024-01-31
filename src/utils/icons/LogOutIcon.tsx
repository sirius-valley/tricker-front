import { IconProps } from "@utils/types";

const LogOutIcon = (props: IconProps) => {
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
        d="M14.9049 3H4.61921C4.27822 3 3.95119 3.13546 3.71007 3.37658C3.46895 3.6177 3.3335 3.94472 3.3335 4.28571V19.7143C3.3335 20.0553 3.46895 20.3823 3.71007 20.6234C3.95119 20.8645 4.27822 21 4.61921 21H14.9049C15.2459 21 15.5729 20.8645 15.8141 20.6234C16.0552 20.3823 16.1906 20.0553 16.1906 19.7143V15.8571H10.1671C9.99657 15.8571 9.83306 15.7894 9.7125 15.6689C9.59194 15.5483 9.52421 15.3848 9.52421 15.2143C9.52421 15.0438 9.59194 14.8803 9.7125 14.7597C9.83306 14.6392 9.99657 14.5714 10.1671 14.5714H16.1906V4.28571C16.1906 3.94472 16.0552 3.6177 15.8141 3.37658C15.5729 3.13546 15.2459 3 14.9049 3Z"
        fill={fillColor}
      />
      <path
        d="M18.2219 11.5374C18.0989 11.4321 17.9407 11.377 17.7789 11.3833C17.6171 11.3895 17.4636 11.4566 17.3491 11.5711C17.2346 11.6856 17.1676 11.8391 17.1613 12.0009C17.1551 12.1626 17.2101 12.3208 17.3154 12.4438L19.4883 14.5717H16.1904V15.8574H19.4883L17.3154 18.0817C17.2481 18.1393 17.1935 18.2102 17.1549 18.29C17.1163 18.3697 17.0946 18.4566 17.0912 18.5451C17.0878 18.6337 17.1027 18.722 17.135 18.8045C17.1673 18.887 17.2164 18.9619 17.279 19.0245C17.3417 19.0872 17.4166 19.1362 17.4991 19.1685C17.5816 19.2008 17.6699 19.2158 17.7584 19.2123C17.8469 19.2089 17.9338 19.1872 18.0136 19.1486C18.0933 19.1101 18.1642 19.0554 18.2219 18.9881L21.9761 15.2595L18.2219 11.5374Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default LogOutIcon;
