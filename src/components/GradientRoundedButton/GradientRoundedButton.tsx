import "../../index.css";
import React from "react";
import { cva, VariantProps } from "class-variance-authority";

const gradientRoundedButtonVariants = cva(
  ["bg-gradient rounded-full flex items-center justify-center cursor-pointer"],
  {
    variants: {
      size: {
        md: "w-[40px] h-[40px]",
        lg: "w-[56px] h-[56px]",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

export interface GradientRoundedButtonProps
  extends VariantProps<typeof gradientRoundedButtonVariants>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export const GradientRoundedButton: React.FC<GradientRoundedButtonProps> = ({
  className,
  icon,
  size,
  ...props
}) => {
  let iconSize;
  switch (size) {
    case "md":
      iconSize = "30px"
      break;
    case "lg":
      iconSize = "40px"
      break;
    default:
      iconSize = "40px"
  }

  const IconComponent = React.cloneElement(icon as React.ReactElement, {
    width: iconSize,
    height: iconSize,
  });

  return (
    <button className={gradientRoundedButtonVariants({ size, className })} {...props}>
      {IconComponent}
    </button>
  );
};
