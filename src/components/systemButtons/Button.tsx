import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import FeatureIcon from '../../utils/icons/FeatureIcon';
import Body1 from '../../utils/typography/body1/body1';

const buttonVariants = cva(
  [
    'rounded-lg flex items-center justify-center cursor-pointer',
    'transition-all duration-300 ease-in-out focus:outline-none',
    'disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed'
  ],
  {
    variants: {
      size: {
        large: 'w-[170px] h-[56px]',
        medium: 'w-[170px] h-[42px]',
      },
      variant: {
        
        filled: ['bg-primary-400 hover:bg-primary-500',
          'text-black cursor-pointer',
        ],
        outline: ['bg-transparent border border-primary-400 hover:bg-gray-400',
          'text-white cursor-pointer',
        ],
        ghost: ['bg-transparent hover:bg-gray-400',
          'text-primary-400',
        ],
      },
      // state: {
      //   // outlinedefault: ['bg-transparent hover:bg-gray-400'],
      //   // ghostdefault: ['bg-transparent hover:bg-gray-400'],
      // },
    },
    defaultVariants:{
      size: 'medium',
      variant: 'filled',
    }
  }
);

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  variant,
  ...props
}) => {
  const buttonClass = buttonVariants({ ...props, variant });


  return (
    <button className={buttonClass} {...props} style={{ borderRadius: '12px' }} disabled={disabled}>
      <span className="mr-2">
        <FeatureIcon fillColor="black" width="24" height="24" />
      </span>
      <Body1>{children}</Body1>
      <span className="ml-2">
        <FeatureIcon fillColor="black" width="24" height="24" />
      </span>
    </button>
  );
};

export default Button;

