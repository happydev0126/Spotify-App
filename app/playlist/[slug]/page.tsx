import { getPlaylist, getUser } from "@/app/api/spotify/spotify-api";
import Track from "@/app/components/track";
import { Playlist, User } from "@/app/types/spotify";
import { auth, clerkClient } from "@clerk/nextjs/server";

export default async function Page({ params }: { params: { slug: string } }) {

  const { userId } = auth();
  let playlist: Playlist | undefined = undefined
  let owner: User | undefined = undefined
  let token: string
  if (userId) {
    const provider = 'oauth_spotify';
    token = await clerkClient.users.getUserOauthAccessToken(userId, provider).then(data => data.data[0].token)
    playlist = await getPlaylist(token, params.slug)
    owner = await getUser(token, playlist.owner.id)
  }

  if (!playlist) {
    return <div>No playlist found</div>
  }

  return (
    <div className="overflow-y-scroll overflow-x-hidden gap-6 flex flex-col">
      <div className="flex flex-col items-center md:flex-row md:items-end w-full gap-4">
        <img className="shadow xs:order-2 max-w-56 rounded" src={playlist.images[0].url} alt={playlist.name} />
        <div className="flex flex-col xs:order-1 gap-4">
          <span className="capitalize xs:order-2">{playlist.type}</span>
          <h2 className="text-6xl font-bold xs:order-1">{playlist.name}</h2>
          <span className="italic text-gray-400 xs:order-3">{playlist.description}</span>
          <div className="flex flex-row gap-2">
            {owner?.images[0] &&
              <img src={owner?.images[0].url} alt={playlist.owner.display_name} className="max-w-6 rounded-2xl" />
            }
            <span className="font-bold">{playlist.owner.display_name}  </span>
            <span>{playlist.tracks.total} songs </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full text-sm text-zinc-400">
        <div className="grid items-center grid-cols-[3%_35%_25%_22%_5%] gap-x-6 gap-y-2">
          <span className="w-full text-right">#</span>
          <span>Title</span>
          <span>Album</span>
          <span>Date added</span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" data-icon="SvgClock" aria-hidden="true"><path d="M11.75 2.75a9 9 0 11-6.364 2.636A8.972 8.972 0 0111.75 2.75zm0 5.2v4h4.2"></path></svg>
          </span>
        </div>

        <hr className="mt-2 mb-4 opacity-20" />
        {playlist.tracks.items.map((item, index) => (
          <Track key={item.track.id} item={item.track} added_at={item.added_at} index={index} token={token} playlist_uri={playlist.uri} />
        ))}
      </div>
    </div >
  );
}

