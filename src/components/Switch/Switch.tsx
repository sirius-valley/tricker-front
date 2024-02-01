import "../../index.css";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export interface SwitchProps extends React.HTMLAttributes<HTMLInputElement> {
  onChecked?: (checked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ onChecked }) => {
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChecked && onChecked(e.target.checked);
  };

  const inputId: string = uuidv4();

  return (
    <div className="inline-flex items-center">
      <div className="relative inline-block w-[50px] h-[27px] rounded-full cursor-pointer">
        <input
          id={inputId}
          type="checkbox"
          onChange={handle}
          className="absolute left-0 w-[50px] h-[27px] transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-gray-200 checked:bg-primary-500"
        />
        <label
          htmlFor={inputId}
          className="absolute ml-[4px] left-0 top-[3px] h-[21px] w-[21px] cursor-pointer rounded-full bg-white shadow-sm transition-all duration-300  peer-checked:translate-x-full"
        ></label>
      </div>
    </div>
  );
};
