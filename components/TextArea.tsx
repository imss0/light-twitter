// import type { UseFormRegisterReturn } from "react-hook-form";

import { useEffect, useRef } from "react";

interface TextareaProps {
  placeholder?: string;
  id: string;
  onChange?: any;
  // register: UseFormRegisterReturn;
  [key: string]: any;
}

export default function Textarea({
  placeholder,
  id,
  // register,
  ...rest
}: TextareaProps) {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = "auto";
      textarea.current.style.height = textarea.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    handleResizeHeight();
  }, []);

  return (
    <div className="w-full p-1 flex flex-col">
      <textarea
        {...rest}
        // {...register}
        id={id}
        placeholder={placeholder}
        onChange={handleResizeHeight}
        rows={1}
        ref={textarea}
        className="rounded-md border border-gray-400 p-2 resize-none overflow-hidden"
      />
    </div>
  );
}
