import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const pillVariants = cva(
  [
    'rounded-[91px] py-[4px] px-[8px] max-w-fit max-h-fit font-inter text-[12px] leading-[15px] text-left '
  ],
  {
    variants: {
      variant: {
        default: ['bg-gray-400 text-white font-normal'],
        gradient: ['bg-gradient text-black font-semibold'],
        error: ['bg-error-500 text-white font-semibold']
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface PillProps
  extends VariantProps<typeof pillVariants>,
    React.HTMLAttributes<HTMLDivElement> {}

export const Pill: React.FC<PillProps> = ({
  className,
  variant,
  children,
  ...props
}) => {
  return (
    <div className={pillVariants({ variant, className })} {...props}>
      {children}
    </div>
  )
}
