import "../../index.css";
import React from "react";

export interface SwitchProps extends React.HTMLAttributes<HTMLInputElement> {
  onChecked?: (checked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ onChecked }) => {
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChecked && onChecked(e.target.checked);
  };

  return (
    <div className="inline-flex items-center">
      <div className="relative inline-block w-[50px] h-[27px] rounded-full cursor-pointer">
        <input
          id="switch-input"
          type="checkbox"
          onChange={handle}
          className="absolute left-0 w-[50px] h-[27px] transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-gray-200 checked:bg-primary-500"
        />
        <label
          htmlFor="switch-input"
          className="absolute ml-[4px] left-0 top-[3px] h-[21px] w-[21px] cursor-pointer rounded-full bg-white shadow-sm transition-all duration-300  peer-checked:translate-x-full"
        ></label>
      </div>
    </div>
  );
};
