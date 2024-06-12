import { getPlaylist, getUser } from "@/app/api/spotify/spotify-api";
import Card from "@/app/components/card";
import { Playlist, User } from "@/app/types/spotify";
import { auth, clerkClient } from "@clerk/nextjs/server";

export default async function Page({ params }: { params: { slug: string } }) {

  const { userId } = auth();
  let playlist: Playlist
  let owner: User
  if (userId) {
    const provider = 'oauth_spotify';
    const token = await clerkClient.users.getUserOauthAccessToken(userId, provider).then(data => data.data[0].token)
    playlist = await getPlaylist(token, params.slug)
    owner = await getUser(token, playlist.owner.id)
  }

  if (!playlist) {
    return <div>No playlist found</div>
  }

  return (
    <Card className="overflow-y-scroll">
      <div className="flex flex-row items-end w-full gap-4">
        <img className="shadow max-w-60 rounded" src={playlist.images[0].url} alt={playlist.name} />
        <div className="flex flex-col gap-4">
          <span className="capitalize">{playlist.type}</span>
          <h2 className="text-6xl font-bold">{playlist.name}</h2>
          <span className="italic text-gray-400">{playlist.description}</span>
          <div className="flex flex-row gap-2">
            <img src={owner.images[0].url} alt={playlist.owner.display_name} className="max-w-6 rounded-2xl" />
            <span className="font-bold">{playlist.owner.display_name}  </span>
            <span>{playlist.tracks.total} songs </span>
          </div>
        </div>
      </div>
      <hr />
      <div className="grid items-center grid-cols-[50px_minmax(100px,max-content)_minmax(100px,max-content)_minmax(100px,max-content)_minmax(100px,max-content)] gap-x-6 gap-y-4 text-gray-300">
        <span className="w-full text-right">#</span>
        <span>Title</span>
        <span>Album</span>
        <span>Date added</span>
        <span>🕒</span>
        {playlist.tracks.items.map((item, index) => (
          <>
            <div className="w-full text-right">{index + 1}</div>
            <div className="flex flex-row items-center gap-2">
              <img src={item.track.album.images[0].url} className="max-w-12 rounded" alt="" />
              {item.track.album.id}
              <div>
                <div className="text-white">{item.track.name}</div>
                <div className="text-xs">{item.track.artists[0].name}</div>
              </div>
            </div>
            <div>{item.track.album.name}</div>
            <div>{item.added_at}</div>
            <div>{item.track.duration_ms}</div>
          </>
        ))}
      </div>
    </Card >
  );
}

