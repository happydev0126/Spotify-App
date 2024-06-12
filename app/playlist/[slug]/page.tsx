import { getCurrentUserPlaylists, getDevice, getPlaylist, getUser } from "@/app/api/spotify/spotify-api";
import Card from "@/app/components/card";
import TrackC from "@/app/components/track";
import { Playlist, User } from "@/app/types/spotify";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { useContext } from 'react';

export default async function Page({ params }: { params: { slug: string } }) {

  const { userId } = auth();
  let playlist: Playlist
  let owner: User
  let token: string
  if (userId) {
    const provider = 'oauth_spotify';
    token = await clerkClient.users.getUserOauthAccessToken(userId, provider).then(data => data.data[0].token)
    playlist = await getPlaylist(token, params.slug)
    owner = await getUser(token, playlist.owner.id)
    // playlists = await getCurrentUserPlaylists(token).then(data => data.items)

  }
  // console.log({ device })

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
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" data-icon="SvgClock" aria-hidden="true"><path d="M11.75 2.75a9 9 0 11-6.364 2.636A8.972 8.972 0 0111.75 2.75zm0 5.2v4h4.2"></path></svg>
        </span>
        {playlist.tracks.items.map((item, index) => (
          <>
            <TrackC item={item} index={index} token={token} device={''} />
          </>
        ))}
      </div>
    </Card >
  );
}

