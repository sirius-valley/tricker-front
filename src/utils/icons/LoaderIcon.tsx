import { IconProps } from "@utils/types";

const LoaderIcon = (props: IconProps) => {
  const { fillColor, width, height } = props;

  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill={fillColor || "#FEFEFE"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.75 12C21.75 14.5859 20.7228 17.0659 18.8943 18.8943C17.0658 20.7228 14.5859 21.75 12 21.75C9.41414 21.75 6.93419 20.7228 5.10571 18.8943C3.27723 17.0659 2.25 14.5859 2.25 12C2.25 8.1563 4.48219 4.6538 7.93688 3.06849C8.02638 3.02737 8.12311 3.00428 8.22153 3.00054C8.31996 2.9968 8.41816 3.01249 8.51052 3.0467C8.60289 3.08091 8.68761 3.13298 8.75985 3.19994C8.8321 3.26689 8.89044 3.34742 8.93156 3.43692C8.97268 3.52643 8.99577 3.62316 8.99951 3.72158C9.00325 3.82001 8.98756 3.91821 8.95335 4.01057C8.91914 4.10294 8.86707 4.18766 8.80011 4.2599C8.73316 4.33215 8.65263 4.39049 8.56312 4.43161C5.63906 5.77411 3.75 8.74411 3.75 12C3.75 14.1881 4.61919 16.2865 6.16637 17.8337C7.71354 19.3809 9.81196 20.25 12 20.25C14.188 20.25 16.2865 19.3809 17.8336 17.8337C19.3808 16.2865 20.25 14.1881 20.25 12C20.25 8.74411 18.3609 5.77411 15.4369 4.43161C15.2561 4.34857 15.1157 4.19711 15.0466 4.01057C14.9776 3.82403 14.9854 3.61769 15.0684 3.43692C15.1515 3.25616 15.3029 3.1158 15.4895 3.0467C15.676 2.9776 15.8824 2.98544 16.0631 3.06849C19.5178 4.6538 21.75 8.1563 21.75 12Z"
        fill={fillColor || "#FEFEFE"}
      />
    </svg>
  );
};

export default LoaderIcon;
