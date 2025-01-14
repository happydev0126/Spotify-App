import { CSSProperties, ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`flex w-full flex-col gap-5 overflow-hidden rounded-xl bg-background-alt p-5 ${className}`}
    >
      {children}
    </div>
  );
}
