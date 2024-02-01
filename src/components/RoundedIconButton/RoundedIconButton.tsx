import "../../index.css";
import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import config from "../../../tailwind.config";

const roundedIconButtonVariants = cva(
  ["rounded-full flex items-center justify-center"],
  {
    variants: {
      variant: {
        blocked: "bg-error-500 hover:opacity-80 cursor-pointer",
        default: "bg-gray-400 hover:opacity-80 cursor-pointer",
        disabled: "bg-gray-400 cursor-not-allowed",
      },
      size: {
        sm: "w-8 h-8 p-[5.82px]",
        lg: "w-11 h-11 p-2",
      },
    },
    defaultVariants: {
      size: "lg",
      variant: "default",
    },
  }
);

export interface RoundedIconButtonProps
  extends VariantProps<typeof roundedIconButtonVariants>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export const RoundedIconButton: React.FC<RoundedIconButtonProps> = ({
  className,
  icon,
  size,
  variant,
  ...props
}) => {
  let iconSize;
  switch (size) {
    case "sm":
      iconSize = "20px"
      break;
    case "lg":
      iconSize = "28px"
      break;
    default:
      iconSize = "28px"
  }

  const colors = config.theme.extend.colors;

  const IconComponent = React.cloneElement(icon as React.ReactElement, {
    width: iconSize,
    height: iconSize,
    fillColor: (variant === "disabled") ? colors.gray[200]+"33" : colors.gray[200], // 33: 20% opacity
  });

  return (
    <button className={roundedIconButtonVariants({ variant, size, className })} {...props}>
      {IconComponent}
    </button>
  );
};
