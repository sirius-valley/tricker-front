import { type IconProps } from '@utils/types'

const AlarmIcon = (props: IconProps): JSX.Element => {
  const { fillColor, width, height } = props

  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill={fillColor || '#FEFEFE'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.2251 4.18949L3.43949 6.97509C3.37479 7.0398 3.29798 7.09112 3.21344 7.12614C3.1289 7.16116 3.03829 7.17918 2.94679 7.17918C2.85528 7.17918 2.76468 7.16116 2.68014 7.12614C2.5956 7.09112 2.51879 7.0398 2.45408 6.97509C2.32341 6.84442 2.25 6.66719 2.25 6.48239C2.25 6.29759 2.32341 6.12036 2.45408 5.98969L5.23969 3.20408C5.30439 3.13938 5.3812 3.08806 5.46574 3.05304C5.55028 3.01802 5.64089 3 5.73239 3C5.8239 3 5.9145 3.01802 5.99904 3.05304C6.08358 3.08806 6.16039 3.13938 6.2251 3.20408C6.2898 3.26879 6.34112 3.3456 6.37614 3.43014C6.41116 3.51468 6.42918 3.60528 6.42918 3.69679C6.42918 3.78829 6.41116 3.8789 6.37614 3.96344C6.34112 4.04798 6.2898 4.12479 6.2251 4.18949ZM21.5459 5.98969L18.7603 3.20408C18.6296 3.07341 18.4524 3 18.2676 3C18.0828 3 17.9056 3.07341 17.7749 3.20408C17.6442 3.33476 17.5708 3.51199 17.5708 3.69679C17.5708 3.88159 17.6442 4.05882 17.7749 4.18949L20.5605 6.97509C20.6252 7.0398 20.702 7.09112 20.7866 7.12614C20.8711 7.16116 20.9617 7.17918 21.0532 7.17918C21.1447 7.17918 21.2353 7.16116 21.3199 7.12614C21.4044 7.09112 21.4812 7.0398 21.5459 6.97509C21.6106 6.91039 21.6619 6.83358 21.697 6.74904C21.732 6.6645 21.75 6.57389 21.75 6.48239C21.75 6.39089 21.732 6.30028 21.697 6.21574C21.6619 6.1312 21.6106 6.05439 21.5459 5.98969ZM20.3568 12.75C20.3568 14.4028 19.8667 16.0185 18.9484 17.3928C18.0302 18.7671 16.725 19.8382 15.198 20.4707C13.671 21.1032 11.9907 21.2687 10.3697 20.9462C8.7486 20.6238 7.25956 19.8279 6.09084 18.6592C4.92212 17.4904 4.12621 16.0014 3.80376 14.3803C3.48131 12.7593 3.64681 11.079 4.27931 9.55199C4.91182 8.02498 5.98293 6.71982 7.3572 5.80157C8.73147 4.88331 10.3472 4.39319 12 4.39319C14.2156 4.39572 16.3397 5.27698 17.9064 6.84364C19.473 8.4103 20.3543 10.5344 20.3568 12.75ZM17.5712 12.75C17.5712 12.5653 17.4978 12.3882 17.3672 12.2576C17.2366 12.127 17.0595 12.0536 16.8748 12.0536H12.6964V7.87519C12.6964 7.6905 12.623 7.51336 12.4924 7.38276C12.3618 7.25216 12.1847 7.17879 12 7.17879C11.8153 7.17879 11.6382 7.25216 11.5076 7.38276C11.377 7.51336 11.3036 7.6905 11.3036 7.87519V12.75C11.3036 12.9347 11.377 13.1118 11.5076 13.2424C11.6382 13.373 11.8153 13.4464 12 13.4464H16.8748C17.0595 13.4464 17.2366 13.373 17.3672 13.2424C17.4978 13.1118 17.5712 12.9347 17.5712 12.75Z"
        fill={fillColor || '#FEFEFE'}
      />
    </svg>
  )
}

export default AlarmIcon
