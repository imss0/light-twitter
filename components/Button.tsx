interface ButtonProps {
  size?: "default" | "large";
  text: string;
  disabled: boolean;
  [key: string]: any;
}

const buttonSizes = {
  default: "h-10 py-2 px-4",
  large: "h-10 py-2 px-16",
};

export default function Button({
  size = "default",
  text,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={`${
        buttonSizes[size]
      } m-1 rounded-md bg-blue-400 text-white cursor-pointer hover:bg-blue-600 ${
        disabled
          ? "bg-gray-400 text-gray-600 hover:bg-gray-300 cursor-not-allowed"
          : "bg-blue-400 text-white cursor-pointer hover:bg-blue-600"
      }`}
    >
      {text}
    </button>
  );
}
