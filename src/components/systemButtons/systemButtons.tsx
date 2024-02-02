import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  [
    'rounded-lg flex items-center justify-center cursor-pointer',
    'transition-all duration-300 ease-in-out focus:outline-none',
  ],
  {
    variants: {
      size: {
        large: 'w-[170px] h-[56px]',
        medium: 'w-[170px] h-[42px]',
        // small: '',
      },
      variant:{
        filled: {
            large: 'bg-primary-400',
            medium: 'bg-primary-400',
            // small: '',
        },
        outline: {
            large: 'border border-primary-400',
            medium: 'border border-primary-400',
            // small: '',
        },
        ghost: {
            large: 'bg-transparent',
            medium: 'bg-transparent',
            // small: ''
        },
      },
      state: {
        default: 'bg-primary-400',
        ghostdefault: 'bg-transparent',
        ghosthover: 'bg-gray-400',
        defaultoutline: 'bg-transparent border-2 border-primary-400',
        hover: 'bg-primary-500',
        hoveroutline: 'bg-gray-400 border-2 border-primary-400',
        disabled: 'bg-gray-200 cursor-not-allowed',
      },
      typography:{
        filleddefault: 'font-inter text-black font-medium leading-[19px] tracking-[0em] text-left',
        filledhover: 'font-inter text-white',
        filleddisabled: 'font-inter font-medium leading-[19px] tracking-[0em] text-left text-gray-400',
        defaultoutline: 'font-inter text-white font-medium leading-[19px] tracking-[0em] text-left',
        hoveroutline: 'font-inter text-white font-medium leading-[19px] tracking-[0em] text-left',
        disabledoutline: 'font-inter text-gray-400 font-medium leading-[19px] tracking-[0em] text-left',
        defaultghost: 'font-inter text-primary-400 font-medium leading-[19px] tracking-[0em] text-left',
      },
    },
    defaultVariants: {
      size: 'large',
      state: 'default',
      // typography: 'default',
     },
  }
);

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, leftIcon, rightIcon, ...props }) => {
  const buttonClass = buttonVariants(props);

  return (
    <button className={buttonClass} {...props}>
      <span className="mr-2">
        {/* <FeatureIcon fillColor="white" width="24" height="24" /> */}
      </span>
      <span>{children}</span>
      <span className="ml-2">
        {/* <FeatureIcon fillColor="white" width="24" height="24" /> */}
      </span>
    </button>
  );
};

export default Button;
