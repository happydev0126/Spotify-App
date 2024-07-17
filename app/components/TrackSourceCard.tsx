import { Album, Artist, Playlist } from "../types/spotify";
import { getToken } from "../api/clerk/getToken";
import ListCard from "./ListCard";

export default async function TrackList({ list }: { list: Artist[] | Playlist[] | Album[] }) {
  const token = await getToken()

  if (list.length === 0) {
    return (
      <div className="text-xs italic">This list is empty</div>
    )
  }

  return (
    <div style={{ scrollbarWidth: 'none' }} className="flex flex-row gap-4 overflow-x-scroll">
      {list.map((item) => (
        <ListCard key={item.id} listItem={item} token={token} />
      ))}
    </div>
  )
}

