import { auth, clerkClient } from "@clerk/nextjs/server";
import { getFeaturedPlaylists, getRecentlyPlayed, getUsersTopItems } from "./api/spotify/spotify-api";
import { Artist, FeaturedPlaylist, Item, Playlist, Track as SpotifyTrack } from "./types/spotify";
import Link from "next/link";
import Track from "./components/track";

export default async function Page() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();
  let recentlyPlayed: Item[] = []
  let usersTopArtists: Artist[] = []
  let featuredPlaylist: FeaturedPlaylist = { href: '', items: [], limit: 0, next: '', total: 0, offset: 0, previous: '' }
  let token = ''
  if (userId) {
    const provider = 'oauth_spotify';
    token = await clerkClient.users.getUserOauthAccessToken(userId, provider).then(data => data.data[0].token)
    recentlyPlayed = await getRecentlyPlayed(token, 6).then(data => data.items)
    // usersSavedTracks = await getUsersSavedTracks(token).then(data => data.items)
    usersTopArtists = await getUsersTopItems(token, 'artists', 6).then(data => data.items)
    featuredPlaylist = await getFeaturedPlaylists(token, 6).then(data => data.playlists)
  }


  const removeDuplicates = (items: Item[]) => {
    const seenItems = new Set()
    return items.filter(item => {
      const value = item.track.id
      if (seenItems.has(value)) {
        return false
      }
      seenItems.add(value)
      return true
    })
  }

  // Get the Backend API User object when you need access to the user's information

  // Use `user` to render user details or create UI elements
  return (
    <div className="overflow-y-scroll overflow-x-hidden gap-8 flex flex-col">
      <section className="flex flex-col gap-4 ">
        <h3 className="text-2xl font-bold">Recently played tracks</h3>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
          {removeDuplicates(recentlyPlayed).map((item, index) => (
            <Track key={item.track.id} item={item.track} index={index} token={token} uris={[item.track.uri]} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4 ">
        <h3 className="text-2xl font-bold">Your favorite artists</h3>
        {(usersTopArtists.length < 1) ? <div className="text-xs italic">You dont have favorite artists yet</div> :
          <div style={{ scrollbarWidth: 'none' }} className="flex flex-row gap-4 overflow-x-scroll">
            {usersTopArtists.map((artist: Artist) => (
              <Link href={`/artist/${artist.id}`} key={artist.id} className="flex flex-col items-start gap-2 p-2 rounded hover:bg-gray-50/10">
                <img src={artist.images[1].url} className="min-w-[11rem] max-w-[11rem] ratio aspect-square rounded" alt={artist.name} />
                <div className="flex flex-col">
                  <p className="w-full font-bold text-sm">
                    {artist.name}
                  </p>
                  <p className="w-full text-sm text-zinc-400">
                    {artist.type}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        }
      </section>
      <section className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Featured playlists</h3>
        <div style={{ scrollbarWidth: 'none' }} className="flex flex-row gap-4 w-full overflow-x-scroll">
          {featuredPlaylist.items.map((playlist: Playlist) => (
            <Link href={`/playlist/${playlist.id}`} key={playlist.id} className="flex flex-col items-start gap-2 p-2 rounded overflow-hidden hover:bg-gray-50/10">
              <img src={playlist.images[0].url} className="min-w-44 max-w-32 ratio aspect-square" alt={playlist.name} />
              <div className="flex flex-col">
                <p className="w-full font-bold text-sm whitespace-nowrap text-ellipsis">
                  {playlist.name}
                </p>
                <p className="w-full text-sm text-zinc-400">
                  {playlist.type}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
