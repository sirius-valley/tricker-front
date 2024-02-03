import Subtitle from "../../../utils/typography/subtitle/subtitle";
import { VariantProps, cva } from "class-variance-authority";

const toggleSwitchButtonVariants = cva(
  ["h-[33px] py-2 px-4 rounded-[32px] gap-2 cursor-pointer"],
  {
    variants: {
      state: {
        default: "bg-transparent hover:bg-primary-400/10",
        active: "bg-primary-400 hover:opacity-80",
        disabled: "bg-transparent cursor-not-allowed",
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
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
}

import React from "react";

const ToggleSwitchButton: React.FC<ToggleSwitchButtonProps> = ({
  handleClick,
  text,
  size,
  state,
  className,
}) => {
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    state !== "active" && handleClick(e);
  };
  return (
    <button
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOnClick(e)}
      className={toggleSwitchButtonVariants({ state, size, className })}
    >
      <Subtitle
        className={`text-[14px] leading-[16.94px] capitalize ${
          state !== "active" && "text-gray-300"
        }`}
      >
        {text}
      </Subtitle>
    </button>
  );
};

export default ToggleSwitchButton;
