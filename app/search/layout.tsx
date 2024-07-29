import { ReactNode } from "react";
import SearchInput from "../components/SearchInput";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <SearchInput placeholder="What do you want to play?" />
      <div className="h-full w-full overflow-y-scroll">{children}</div>
    </div>
  );
}
