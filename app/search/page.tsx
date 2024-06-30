import SearchInput from "../components/searchInput";

export default async function Page() {

  return (
    <div>
      {/* <Link href={`/search/${query}`}>Search for something</Link> */}
      <h1>Search page</h1>
      <SearchInput />
    </div >
  )
}
