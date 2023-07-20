import React, { FC, forwardRef } from "react";

interface InputProps {
  label: string;
  placeholder?: string;
  id: string;
  type: "text" | "password" | "email";
  error?: boolean;
  [key: string]: any;
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, id, type, error, ...rest }, ref) => {
    return (
      <div className="w-72 m-2 p-1 flex flex-col">
        <label className="text-sm font-medium text-gray-900" htmlFor={id}>
          {label}
        </label>
        <input
          {...rest}
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          className={`rounded-md border border-gray-400 p-1.5 ${
            error ? "focus:outline-red-500" : ""
          }`}
        />
        <div className="text-red-500 text-xs">
          {error ? "there is an error" : null}
        </div>
      </div>
    );
  }
);

export default Input;
