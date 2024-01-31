import { ChangeEvent, useState } from "react";
import config from "../../../tailwind.config.js";
import { cva, VariantProps } from "class-variance-authority";

const colors = config.theme.extend.colors;

const inputVariants = cva(
  [
    "outline-none placeholder-gray-300 bg-transparent border rounded-lg py-3 px-4 w-[306px] h-[43px] text-gray-300",
  ],
  {
    variants: {
      variant: {
        default: ["text-white cursor-pointer", "hover:border-2 border-gray-300", "focus:border-primary-400"],
        error: ["border-error-500"],
        disabled: ["bg-gray-400", "cursor-not-allowed"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends VariantProps<typeof inputVariants>,
    React.HTMLAttributes<HTMLInputElement> {
  value?: string;
  type?: InputType;
  helpertext?: string;
  icon?: boolean;
  label?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
enum InputType {
  PASSWORD = "password",
  TEXT = "text",
}

const Input = ({
  className,
  variant,
  value = "",
  type = InputType.TEXT,
  helpertext = "",
  icon = false,
  label = "",
  required = false,
  onChange,
  placeholder = "",
}: InputProps) => {
  return (
    <div className="bg-gray-600 w-full h-screen flex justify-center items-center">
      {label !== "" && <label>{label}</label>}
      <input
        className={inputVariants({ variant, className })}
        value={value}
        type={type}
        required={required}
        placeholder="This input is quite long"
        onChange={onChange}
        disabled={variant === "disabled"}
      />
      {helpertext !== "" && <label>{helpertext}</label>}
    </div>
  );
};

export default Input;
