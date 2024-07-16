import { ReactNode } from "react";
import SearchInput from "../components/SearchInput";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full flex flex-col">
      <SearchInput placeholder="What do you want to play?" />
      <div className="overflow-y-scroll w-full h-full">{children}</div>
    </div>
  )
}
