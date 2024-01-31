import '../../index.css'
import React from "react";
import { cva, VariantProps } from "class-variance-authority";

const pillVariants = cva(["rounded-[91px] py-[4px] px-[8px] max-w-fit max-h-fit font-inter text-[12px] leading-[15px] text-left "], {
    variants: {
        variant: {
            default: [
                "bg-gray-400 text-white font-[400]"
            ],
            gradient: [
                "bg-gradient text-black font-[600]"
            ],
            error: [
                "bg-error-500 text-white font-[600]"
            ],
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export interface PillProps extends VariantProps<typeof pillVariants>, React.HTMLAttributes<HTMLDivElement> {}

export const Pill: React.FC<PillProps> = ({ className, variant, children, ...props }) => {
    return <div className={pillVariants({ variant , className })} {...props}>{children}</div>;
};
