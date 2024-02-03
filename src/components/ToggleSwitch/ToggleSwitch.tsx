import React from "react";
import ToggleSwitchButton from "./Button/ToggleSwitchButton";
import Body2 from "../../utils/typography/body2/body2";

export interface ToggleSwitchProps {
  onChecked?: (checked: boolean) => void;
  disableFirstOption?: boolean;
  disableSecondOption?: boolean;
  firstOption?: string;
  secondOption?: string;
  label?: string;
  required?: boolean;
  size?: "mobile" | "desktop";
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  onChecked,
  disableFirstOption = false,
  disableSecondOption = false,
  firstOption = "",
  secondOption = "",
  label = "",
  required = false,
  size,
}) => {
  const [checked, setChecked] = React.useState<boolean>(true);

  const handleClick = () => {
    setChecked(!checked);
    onChecked && onChecked(!checked);
  };

  return (
    <div className="flex flex-col gap-1 max-w-fit">
      {label !== "" && (
        <Body2 className={`pl-2 flex text-white`}>
          {label}
          {required && <Body2 className="text-error-500">*</Body2>}
        </Body2>
      )}
      <div
        className={`w-fit h-[41px] rounded-[32px] border border-gray-300 p-1 gap-1 flex items-center justify-center
        ${
          disableFirstOption || disableSecondOption
            ? "cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        <ToggleSwitchButton
          size={size}
          handleClick={handleClick}
          state={
            disableFirstOption
              ? "disabled"
              : disableFirstOption
              ? "active"
              : checked
              ? "active"
              : "default"
          }
          text={firstOption}
        />
        <ToggleSwitchButton
          size={size}
          handleClick={handleClick}
          state={
            disableSecondOption
              ? "disabled"
              : disableFirstOption
              ? "active"
              : checked
              ? "default"
              : "active"
          }
          text={secondOption}
        />
      </div>
    </div>
  );
};
