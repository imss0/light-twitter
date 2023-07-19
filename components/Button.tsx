interface ButtonProps {
  size?: "default" | "large";
  text: string;
  [key: string]: any;
}

const buttonSizes = {
  default: "h-10 py-2 px-4",
  large: "h-10 py-2 px-16",
};

export default function Button({
  size = "default",
  text,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={`${buttonSizes[size]} m-2 rounded-md bg-blue-400 text-white hover:bg-blue-600`}
    >
      {text}
    </button>
  );
}
