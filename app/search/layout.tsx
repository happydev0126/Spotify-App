import { ReactNode } from "react";
import SearchInput from "../components/searchInput";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SearchInput placeholder="Search" />
      <div>{children}</div>
    </>
  )
}
