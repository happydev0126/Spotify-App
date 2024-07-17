import Link from "next/link";
import { Album, Artist, Playlist } from "../types/spotify";

type MusicSource = Album | Artist | Playlist
export default function TrackList({ list }: { list: Artist[] | Playlist[] | Album[] }) {

  if (list.length === 0) {
    return (
      <div className="text-xs italic">This list is empty</div>
    )
  }

  return (
    <div style={{ scrollbarWidth: 'none' }} className="flex flex-row gap-4 overflow-x-scroll">
      {list.map((item) => (
        <ListCard key={item.id} listItem={item} />
      ))}
    </div>
  )
}

function ListCard({ listItem }: { listItem: Artist | Playlist | Album }) {
  if (listItem.images.length === 0) return
  const getItemSource = (item: MusicSource): string => {
    if (item.type === 'artist') return 'artist';
    if (item.type === 'playlist') return 'playlist';
    if (item.type === 'album') return 'album';
    return '';
  };

  const itemSource = getItemSource(listItem);

  return (
    <Link href={`/${itemSource}/${listItem.id}`} key={listItem.id} className="flex flex-col items-start gap-2 p-2 rounded hover:bg-gray-50/10">
      <img src={listItem.images[0]?.url} className="min-w-[11rem] max-w-[11rem] ratio aspect-square rounded" alt={listItem.name} />
      <div className="flex flex-col">
        <p className="w-full font-bold text-sm">
          {listItem.name}
        </p>
        <p className="w-full text-sm text-zinc-400">
          {listItem.type}
        </p>
      </div>
    </Link>
  )
}
