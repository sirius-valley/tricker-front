import { ChangeEvent, useState } from "react";

enum InputType {
    PASSWORD = "password",
    TEXT = "text",
}

interface InputProps {
  value?: string;
  type?: InputType;
  helpertext?: string;
  icon?: boolean;
  label?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
    value = "",
    type = InputType.TEXT,
    helpertext = "",
    icon = false,
    label = "",
    required = false,
    onChange,
    placeholder = "",
}: InputProps) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className="bg-gray-600 w-full h-screen flex justify-center items-center">
     {
        label !== "" &&
        <label>
            {label}
        </label>
     } 
      <input
      className="border rounded-lg py-3 px-4 w-[306px] h-[43px]"
        value={value}
        type={type}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
      />
      {
        helpertext !== "" &&
        <label>
            {helpertext}
        </label>
     } 
    </div>
  );
};

export default Input