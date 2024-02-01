import config from "../../../tailwind.config";
import CheckIcon from "../../utils/icons/CheckIcon";
import React from "react";

export interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  onChecked?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ onChecked }) => {
  const [checked, setChecked] = React.useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChecked && onChecked(e.target.checked);
  };
  const checkColor: string = config.theme.extend.colors["gray"][500];

  return (
    <div className="inline-flex items-center">
      <div className="relative inline-block h-[16.25px] w-[16.25px] rounded-full cursor-pointer">
        <input
          id="checkbox-input"
          type="checkbox"
          onChange={handleChange}
          className="absolute h-[16.25px] w-[16.25px] border-[1.11px] rounded-[4.44px] appearance-none cursor-pointer peer bg-transparent checked:bg-primary-400 hover:bg-gray-300/20 checked:hover:bg-primary-500 checked:border-none"
        />
        {checked && (
          <label
            htmlFor="checkbox-input"
            className="absolute h-[16.25px] w-[16.25px] cursor-pointer bg-transparent"
          >
            <CheckIcon
              width={"16.25px"}
              height={"16.25px"}
              fillColor={checkColor}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default Checkbox;