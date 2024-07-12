import React, { ButtonHTMLAttributes, FC } from 'react'

interface TagButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

const TagButton: FC<TagButtonProps> = ({ title, ...props }) => {
  return (
    <button className='px-2 py-1 rounded-full bg-zinc-800' {...props}>
      {title}
    </button>
  );
};

export default TagButton
