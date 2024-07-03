import { getArtist, getArtistAlbums, getArtistTopTracks } from "@/app/api/spotify/spotify-api";
import Track from "@/app/components/track";
import Link from "next/link";


export default async function Page({ params }: { params: { slug: string } }) {

  const artist = await getArtist(params.slug)
  const topTracks = await getArtistTopTracks(params.slug).then(data => data?.tracks)
  const albums = await getArtistAlbums(params.slug)

  return (
    <div className="overflow-y-scroll overflow-x-hidden gap-6 flex flex-col">
      {artist &&
        <div className="flex flex-col items-center md:flex-row md:items-end w-full gap-4">
          <img className="shadow xs:order-2 max-w-56 rounded" src={artist.images[0].url} alt={artist.name} />
          <div className="flex flex-col xs:order-1 gap-4">
            <span className="capitalize xs:order-2">{artist.type}</span>
            <h2 className="text-6xl font-bold xs:order-1">{artist.name}</h2>
          </div>
        </div>
      }

      {topTracks &&
        <div className="flex flex-col w-full text-sm text-zinc-400">
          <h3 className="text-4xl text-white font-bold">Popular</h3>
          {
            topTracks.map((track, index: number) => (
              <Track key={track.id} item={track} index={index} uris={[track.uri]} />
            ))
          }
        </div>
      }

      {albums &&
        <section className="flex flex-col gap-4 ">
          <h3 className="text-2xl font-bold">Albums</h3>
          {(albums.items.length < 1) ? <div className="text-xs italic">No albums found</div> :
            <div className="flex flex-row gap-4 overflow-x-scroll">
              {albums?.items.map((album) => (
                <Link href={`/album/${album.id}`} key={album.id} className="flex flex-col items-start gap-2 p-2 hover:bg-gray-50/10">
                  <img src={album.images[0].url} className="min-w-[11rem] max-w-[11rem] ratio aspect-square rounded" alt={album.name} />
                  <div className="flex flex-col">
                    <p className="w-full font-bold text-sm">
                      {album.name}
                    </p>
                    <p className="w-full text-sm text-zinc-400">
                      {album.type}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          }
        </section>
      }
    </div >
  )
}

