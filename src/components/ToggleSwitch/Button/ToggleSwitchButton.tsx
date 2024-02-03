import Subtitle from "../../../utils/typography/subtitle/subtitle";
import { VariantProps, cva } from "class-variance-authority";

const toggleSwitchButtonVariants = cva(
  ["h-[33px] py-2 px-4 rounded-[32px] gap-2 cursor-pointer transition-all duration-200"],//Figma has h-[33px] for both cases
  {
    variants: {
      state: {
        default: "bg-transparent hover:bg-primary-400/10",
        active: "bg-primary-400 hover:opacity-80",
        disabled: "bg-transparent hover:cursor-not-allowed",
      },
      size: {
        mobile: "w-[150px]",//Figma has w-[139.5px] for mobile designs
        desktop: "w-[300px]",//Figma has w-[143px] for desktop designs
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
  handleClick: () => void;
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
  const handleOnClick = () => {
    state !== "active" && handleClick();
  };
  return (
    <button
      disabled={state === "disabled"}
      onClick={() => handleOnClick()}
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
