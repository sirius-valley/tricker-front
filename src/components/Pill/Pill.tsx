import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const pillVariants = cva(
  [
    'flex items-center rounded-[91px] py-[4px] px-[8px] max-w-fit max-h-fit font-inter text-[12px] leading-[15px] text-left font-semibold '
  ],
  {
    variants: {
      variant: {
        label: [
          'bg-transparent text-white leading-[19px] text-[16px] h-[26px] border-[1.3px] border-white px-[10.2px] py-[5.2px]'
        ],
        tracking: ['bg-gradient text-black'],
        blocked: ['bg-error-500 text-white']
      }
    },
    defaultVariants: {
      variant: 'label'
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
