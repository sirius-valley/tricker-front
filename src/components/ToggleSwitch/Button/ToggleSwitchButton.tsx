import Subtitle from "../../../utils/typography/subtitle/subtitle";
import { VariantProps, cva } from "class-variance-authority";

const toggleSwitchButtonVariants = cva(
  ["h-[33px] py-2 px-4 rounded-[32px] gap-2 bg-transparent cursor-pointer"],
  {
    variants: {
      state: {
        default: "hover:bg-primary-400/10",
        active: "bg-primary-400 hover:opacity-80",
        disabled: "cursor-not-allowed",
      },
      size: {
        mobile: "w-[139.5px]",
        desktop: "w-[143px]",
      },
    },
    defaultVariants: {
      size: "desktop",
      state: "active",
    },
  }
);

export interface ToggleSwitchButtonProps
  extends VariantProps<typeof toggleSwitchButtonVariants>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  onChecked?: (checked: boolean) => void;
  disabled?: boolean;
  text: string;
  label?: string;
  required?: boolean;
}

import React from "react";

const ToggleSwitchButton: React.FC<ToggleSwitchButtonProps> = ({
    onChecked,
    disabled,
    text,
    label,
    required,
    size,
    state,
    className,
}) => {
  return (
    <button className={toggleSwitchButtonVariants({ state, size, className })}>
      <Subtitle className="text-[14px] leading-[16.94px] capitalize">
        {text}
      </Subtitle>
    </button>
  );
};

export default ToggleSwitchButton;
