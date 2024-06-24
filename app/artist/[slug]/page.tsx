import { getArtist, getArtistTopTracks } from "@/app/api/spotify/spotify-api";
import Track from "@/app/components/track";
import { Artist } from "@/app/types/spotify";
import { auth, clerkClient } from "@clerk/nextjs/server"


export default async function Page({ params }: { params: { slug: string } }) {
  const { userId } = auth();
  let token: string
  let artist: Artist | undefined = undefined
  let topTracks
  if (userId) {
    const provider = 'oauth_spotify';
    token = await clerkClient.users.getUserOauthAccessToken(userId, provider).then(data => data.data[0].token)
    artist = await getArtist(token, params.slug)
    topTracks = await getArtistTopTracks(token, params.slug).then(data => data?.tracks)
  }

  if (!artist) {
    return <div>No artist found</div>
  }

  return (
    <div className="overflow-y-scroll overflow-x-hidden gap-6 flex flex-col">
      <div className="flex flex-col items-center md:flex-row md:items-end w-full gap-4">
        <img className="shadow xs:order-2 max-w-56 rounded" src={artist.images[0].url} alt={artist.name} />
        <div className="flex flex-col xs:order-1 gap-4">
          <span className="capitalize xs:order-2">{artist.type}</span>
          <h2 className="text-6xl font-bold xs:order-1">{artist.name}</h2>
        </div>
      </div>
      <div className="flex flex-col w-full text-sm text-zinc-400">
        <h4 className="text-4xl text-white font-bold">Popular</h4>
        {topTracks && topTracks?.length === 0 ? <p>No top tracks found</p> :
          topTracks && topTracks.map((track, index: number) => (
            <>
              <Track item={track} index={index} token={token} uris={[track.uri]} />
            </>
          ))
        }
      </div>
    </div >
  )
}

