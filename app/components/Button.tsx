import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}
export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={`${className} text-gray-400 hover:text-white active:text-white/80`}
      {...props}
    >
      {children}
    </button>
  );
}
