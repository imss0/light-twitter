import {
  useEffect,
  useState,
  FC,
  forwardRef,
  TextareaHTMLAttributes,
} from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
  id: string;
}

const TextArea: FC<TextareaProps> = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ placeholder, id, ...rest }, ref) => {
  const [textareaElement, setTextAreaElement] =
    useState<HTMLTextAreaElement | null>(null);

  const handleResizeHeight = () => {
    if (textareaElement) {
      textareaElement.style.height = "auto";
      textareaElement.style.height = textareaElement.scrollHeight + "px";
    }
  };

  useEffect(() => {
    handleResizeHeight();

    if (textareaElement) {
      textareaElement.addEventListener("input", handleResizeHeight);
    }

    return () => {
      if (textareaElement) {
        textareaElement.removeEventListener("input", handleResizeHeight);
      }
    };
  }, [textareaElement]);

  return (
    <div className="w-full p-1 flex flex-col">
      <textarea
        {...rest}
        id={id}
        placeholder={placeholder}
        rows={2}
        ref={(el) => {
          setTextAreaElement(el);
          if (typeof ref === "function") {
            ref(el);
          } else if (ref && typeof ref === "object") {
            ref.current = el;
          }
        }}
        className="rounded-md border border-gray-400 p-2 resize-none overflow-hidden"
      />
    </div>
  );
});

export default TextArea;
