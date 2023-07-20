// import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  placeholder?: string;
  id: string;
  type: "text" | "password" | "email";
  // register: UseFormRegisterReturn;
  error?: boolean;
  [key: string]: any;
}

export default function Input({
  label,
  placeholder,
  id,
  type,
  // register,
  error,
  ...rest
}: InputProps) {
  return (
    <div className="w-72 m-2 p-1 flex flex-col">
      <label className="text-sm font-medium text-gray-900" htmlFor={id}>
        {label}
      </label>
      <input
        {...rest}
        // {...register}
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
