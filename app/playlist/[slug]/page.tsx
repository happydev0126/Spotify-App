import { getPlaylist } from "@/app/api/spotify/spotify-api";
import Card from "@/app/components/card";
import { Playlist } from "@/app/types/spotify";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

export default async function Page({ params }: { params: { slug: string } }) {

  const { userId } = auth();
  let playlist: Playlist
  if (userId) {
    const provider = 'oauth_spotify';
    const token = await clerkClient.users.getUserOauthAccessToken(userId, provider).then(data => data.data[0].token)
    playlist = await getPlaylist(token, params.slug)
  }

  if (!playlist) {
    return <div>No playlist found</div>
  }

  const user = await currentUser().then(data => data?.externalAccounts)

  return (
    <Card>
      <div className="flex flex-row items-end w-full gap-4">
        <img className="shadow max-w-60 rounded" src={playlist.images[0].url} alt={playlist.name} />
        <div className="flex flex-col gap-4">
          <span className="capitalize">{playlist.type}</span>
          <h2 className="text-5xl font-bold">{playlist.name}</h2>
          <span className="italic text-gray-400">{playlist.description}</span>
          <div className="flex flex-row gap-2">
            <img src={user[0].imageUrl} alt={user[0].username} className="max-w-6 rounded-2xl" />
            <span className="font-bold">{playlist.owner.display_name}  </span>
            <span>{playlist.tracks.total} songs </span>
          </div>
        </div>

        {/* <p>{playlist.owner}</p> */}
      </div>

      <hr />
      <div className="grid grid-cols-4">
        <span>#</span>
        <span>Title</span>
        <span>Date added</span>
        <span>🕒</span>
      </div>

      {playlist.tracks.items.map((item, index) => (
        <div className="grid grid-cols-4">
          <div className="max-w-2">{index + 1}</div>
          <div>{item.track.name}</div>
          <div>{item.added_at}</div>
          <div>{item.track.duration_ms}</div>
        </div>
      ))}
    </Card >
  );
}

