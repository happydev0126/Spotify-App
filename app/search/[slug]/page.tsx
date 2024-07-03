import { getToken } from "@/app/api/clerk/getToken";
import { search } from "@/app/api/spotify/spotify-api";
import Track from "@/app/components/track/track"
import Link from "next/link";


export default async function Page({ params }: { params: { slug: string } }) {
  const searchQuery = await search(params.slug, undefined, 5)
  const token = await getToken()

  if (!searchQuery) return <div>No results found</div>

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col gap-4 w-52">
        <h3 className="text-2xl font-bold">Top Result</h3>
        <div className="flex flex-col gap-4 bg-zinc-800/50 rounded p-4">
          {
            searchQuery.artists &&
            <Link href={`/artist/${searchQuery.artists.items[0].id}`}>
              <img className="rounded-full w-28 h-28" src={searchQuery.artists.items[0].images[0].url} alt={searchQuery.artists.items[0].name} />
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold">{searchQuery.artists.items[0].name}</span>
                <span className="text-gray-400">{searchQuery.artists.items[0].type}</span>
              </div>
            </Link>
          }
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h3 className="text-2xl font-bold">Songs</h3>
        <div className="flex flex-col gap-2">
          {
            searchQuery.tracks &&
            searchQuery?.tracks.items.map((track, index) => (
              <Track token={token} key={track.id} item={track} index={index} uris={[track.uri]} />
            ))}
        </div>
      </div>
    </div>
  )
}
