import { getToken } from "@/app/api/clerk/getToken";
import { search } from "@/app/api/spotify/spotify-api";
import Track from "@/app/components/track/Track"
import { Album } from "@/app/types/spotify";
import Link from "next/link";


export default async function Page({ params }: { params: { slug: string } }) {
  const searchQuery = await search(params.slug, undefined, 4)
  const token = await getToken()

  if (!searchQuery) return <div>No results found</div>

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col gap-4 min-w-[40%]">
          <h3 className="text-2xl font-bold">Top Result</h3>
          {
            searchQuery.artists &&
            <Link
              href={`/artist/${searchQuery.artists.items[0].id}`}
              className="flex flex-col gap-4 bg-zinc-800/50 rounded p-4 h-full items-stretch justify-around">
              <img
                className="rounded-full w-28 h-28"
                src={searchQuery.artists.items[0].images[0].url}
                alt={searchQuery.artists.items[0].name} />
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold whitespace-nowrap text-ellipsis overflow-hidden">{searchQuery.artists.items[0].name}</span>
                <span className="text-gray-400">{searchQuery.artists.items[0].type}</span>
              </div>
            </Link>
          }
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h3 className="text-2xl font-bold">Songs</h3>
          <div className="flex flex-col gap-2">
            {
              searchQuery.tracks &&
              searchQuery?.tracks.items.map((track, index) => (
                <Track token={token} key={track.id} item={track} index={index} uris={[track.uri]} variant="trackOnly" />
              ))}
          </div>
        </div>

      </div>

      <h3 className="text-2xl font-bold">Albums</h3>
      <div style={{ scrollbarWidth: 'none' }} className="flex flex-row gap-4 w-full overflow-x-scroll">
        {searchQuery.albums?.items.map((album: Album) => (
          <Link href={`/album/${album.id}`} key={album.id} className="flex flex-col items-start gap-2 p-2 rounded hover:bg-gray-50/10">
            <img src={album.images[0].url} className="min-w-[11rem] max-w-[11rem] ratio aspect-square rounded" alt={album.name} />
            <div className="flex flex-col">
              <p className="w-full font-bold text-sm whitespace-nowrap text-ellipsis">
                {album.name}
              </p>
              <p className="w-full text-sm text-zinc-400">
                {album.type}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <h3 className="text-2xl font-bold">Artists</h3>
      <div style={{ scrollbarWidth: 'none' }} className="flex flex-row gap-4 w-full overflow-x-scroll">
        {searchQuery.artists?.items.map((artist) => (
          <Link href={`/artist/${artist.id}`} key={artist.id} className="flex flex-col items-start gap-2 p-2 rounded hover:bg-gray-50/10">
            <img src={artist.images[1]?.url} className="min-w-[11rem] max-w-[11rem] ratio aspect-square rounded" alt={artist.name} />
            <div className="flex flex-col">
              <p className="w-full font-bold text-sm whitespace-nowrap text-ellipsis">
                {artist.name}
              </p>
              <p className="w-full text-sm text-zinc-400">
                {artist.type}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
