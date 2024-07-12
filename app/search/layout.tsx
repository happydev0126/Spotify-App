import { ReactNode } from "react";
import SearchInput from "../components/SearchInput";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SearchInput placeholder="What do you want to play?" />
      <div className="overflow-y-scroll">{children}</div>
    </>
  )
}
