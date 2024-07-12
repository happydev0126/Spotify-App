import { getToken } from "@/app/api/clerk/getToken";
import { getAlbum } from "@/app/api/spotify/spotify-api";
import Track from "@/app/components/track/Track"

export default async function Page({ params }: { params: { slug: string } }) {
  const album = await getAlbum(params.slug)
  const token = await getToken()

  if (!album) {
    return <div>No album found</div>
  }

  return (
    <div className="overflow-y-scroll overflow-x-hidden gap-6 flex flex-col">
      <div className="flex flex-col items-center md:flex-row md:items-end w-full gap-4">
        <img className="shadow xs:order-2 max-w-56 rounded" src={album.images[0].url} alt={album.name} />
        <div className="flex flex-col xs:order-1 gap-4">
          <span className="capitalize xs:order-2">{album.type}</span>
          <h2 className="sm:text:sm md:text-xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold xs:order-1">{album.name}</h2>
        </div>
      </div>
      <div className="flex flex-col w-full text-sm text-zinc-400">
        <h4 className="text-4xl text-white font-bold">Tracks</h4>
        {album.tracks.items.map((track, index: number) => (
          <Track variant="trackOnly" token={token} key={track.id} item={track} index={index} playlist_uri={album.uri} />
        ))
        }
      </div>
    </div>
  )
}

