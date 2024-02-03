import React, { useEffect, useState } from "react";
import Subtitle from "../../utils/typography/subtitle/subtitle";
import { VariantProps, cva } from "class-variance-authority";
import ToggleSwitchButton from "./Button/ToggleSwitchButton";

export interface ToggleSwitchProps {
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
        <ToggleSwitchButton text={firstOption}/>
        <ToggleSwitchButton text={secondOption}/>
    </div>
  );
};