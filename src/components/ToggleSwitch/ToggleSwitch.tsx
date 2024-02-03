import React, { useEffect, useState } from "react";
import Subtitle from "../../utils/typography/subtitle/subtitle";
import { VariantProps, cva } from "class-variance-authority";

const toggleSwitchVariants = cva(
  ["h-[33px] py-2 px-4 rounded-[32px] gap-2 bg-transparent cursor-pointer"],
  {
    variants: {
      state: {
        default: "hover:bg-primary-400/10",
        active: "bg-primary-400 hover:opacity-80",
        disabled: "cursor-not-allowed",
      },
      size: {
        sm: "w-[139.5px]",
        lg: "w-[143px]",
      },
    },
    defaultVariants: {
      size: "lg",
      state: "active",
    },
  }
);

export interface ToggleSwitchProps
  extends VariantProps<typeof toggleSwitchVariants>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  onChecked?: (checked: boolean) => void;
  disabled?: boolean;
  firstOption?: string;
  secondOption?: string;
  label?: string;
  required?: boolean;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  onChecked,
  disabled,
  firstOption = "",
  secondOption = "",
  label = "",
  required = false,
  size,
  state,
  className
}) => {
  const [checked, setChecked] = React.useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setChecked(!checked);
    onChecked && onChecked(!checked);
  };

  let selectedColor = "#FFFFFF";
  selectedColor = disabled ? "#FFFFFF" + 80 : selectedColor;

  return (
    <div
      className={
        "w-fit h-[41px] rounded-[32px] border border-gray-300 p-1 gap-1 flex items-center justify-center" +
        (disabled === true ? "cursor-not-allowed" : "cursor-pointer")
      }
    >
      <button className={toggleSwitchVariants({state, size, className})}>
        <Subtitle className="text-[14px] leading-[16.94px] capitalize">
          {firstOption}
        </Subtitle>
      </button>
      <button className={toggleSwitchVariants({state, size, className})}>
        <Subtitle className="text-[14px] leading-[16.94px] capitalize">
          {secondOption}
        </Subtitle>
      </button>
    </div>
  );
};
