import { ReactNode } from "react";
import SearchInput from "../components/searchInput";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SearchInput placeholder="What do you want to play?" />
      <div className="overflow-y-scroll">{children}</div>
    </>
  )
}
