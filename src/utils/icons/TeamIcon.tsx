import { IconProps } from "@utils/types";

const TeamIcon = (props: IconProps) => {
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
        d="M4.52745 10.9107C5.70504 10.9107 6.66245 9.93376 6.66245 8.73214C6.66245 7.53052 5.70504 6.55357 4.52745 6.55357C3.34987 6.55357 2.39245 7.53052 2.39245 8.73214C2.39245 9.93376 3.34987 10.9107 4.52745 10.9107ZM19.4725 10.9107C20.65 10.9107 21.6075 9.93376 21.6075 8.73214C21.6075 7.53052 20.65 6.55357 19.4725 6.55357C18.2949 6.55357 17.3375 7.53052 17.3375 8.73214C17.3375 9.93376 18.2949 10.9107 19.4725 10.9107ZM20.54 12H18.405C17.8178 12 17.2874 12.2417 16.9004 12.6331C18.2448 13.3854 19.1989 14.7436 19.4057 16.3571H21.6075C22.1979 16.3571 22.675 15.8704 22.675 15.2679V14.1786C22.675 12.977 21.7175 12 20.54 12ZM12 12C14.0649 12 15.7362 10.2946 15.7362 8.1875C15.7362 6.08041 14.0649 4.375 12 4.375C9.93501 4.375 8.2637 6.08041 8.2637 8.1875C8.2637 10.2946 9.93501 12 12 12ZM14.562 13.0893H14.2851C13.5912 13.4297 12.8206 13.6339 12 13.6339C11.1793 13.6339 10.412 13.4297 9.71483 13.0893H9.43795C7.3163 13.0893 5.59495 14.8458 5.59495 17.0107V17.9911C5.59495 18.8931 6.31218 19.625 7.1962 19.625H16.8037C17.6877 19.625 18.405 18.8931 18.405 17.9911V17.0107C18.405 14.8458 16.6836 13.0893 14.562 13.0893ZM7.09946 12.6331C6.71249 12.2417 6.18208 12 5.59495 12H3.45995C2.28237 12 1.32495 12.977 1.32495 14.1786V15.2679C1.32495 15.8704 1.80199 16.3571 2.39245 16.3571H4.59083C4.801 14.7436 5.75508 13.3854 7.09946 12.6331Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default TeamIcon;
