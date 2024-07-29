import React, { ButtonHTMLAttributes, FC } from "react";

interface TagButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const TagButton: FC<TagButtonProps> = ({ title, ...props }) => {
  return (
    <button
      className="rounded-full bg-zinc-800 px-3 py-1.5 text-sm capitalize text-zinc-300 hover:bg-zinc-700"
      {...props}
    >
      {title}
    </button>
  );
};

export default TagButton;
