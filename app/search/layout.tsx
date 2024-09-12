import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="h-full w-full overflow-y-scroll">{children}</div>
    </div>
  );
}
