import { auth, clerkClient } from "@clerk/nextjs/server";
import { getFeaturedPlaylists, getRecentlyPlayed, getUsersSavedTracks, getUsersTopItems } from "./api/spotify/spotify-api";
import { UserButton } from "@clerk/nextjs";
import Tag from "./components/tag";
import { Artist, FeaturedPlaylist, Item, Playlist } from "./types/spotify";

export default async function Page() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();
  let recentlyPlayed: Item[] = []
  let usersTopItems: Artist[] = []
  let featuredPlaylist: FeaturedPlaylist = { href: '', items: [], limit: 0, next: '', total: 0, offset: 0, previous: '' }
  if (userId) {
    const provider = 'oauth_spotify';
    const token = await clerkClient.users.getUserOauthAccessToken(userId, provider).then(data => data.data[0].token)
    recentlyPlayed = await getRecentlyPlayed(token, 6).then(data => data.items)
    // usersSavedTracks = await getUsersSavedTracks(token).then(data => data.items)
    usersTopItems = await getUsersTopItems(token, 'artists', 6).then(data => data.items)
    featuredPlaylist = await getFeaturedPlaylists(token, 6).then(data => data.playlists)
  }

  // Get the Backend API User object when you need access to the user's information

  // Use `user` to render user details or create UI elements
  return (
    <div className="overflow-y-scroll overflow-x-hidden gap-8 flex flex-col">
      {/* TODO */}
      {/* <div className="row flex gap-2"> */}
      {/*   <Tag title={'All'} /> */}
      {/*   <Tag title={'Music'} /> */}
      {/*   <Tag title={'Podcasts'} /> */}
      {/* </div> */}
      <section className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        {recentlyPlayed.map((item) => (
          <div key={item.track.id} className="flex flex-row h-14 items-center">
            <img src={item.track.album.images[0].url} className="h-full rounded-l" alt="" />
            <p className="flex h-full w-full whitespace-nowrap overflow-hidden text-wrap items-center bg-white/10 p-2 font-bold text-sm">
              {item.track.album.name}
            </p>
          </div>
        ))}
      </section>
      <section className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Your favorite artists</h3>
        <div className="flex flex-row gap-4">
          {usersTopItems.map((item: Artist) => (
            <div key={item.id} className="flex flex-col items-start gap-2">
              <img src={item.images[0].url} className="min-w-[11rem] max-w-[11rem] ratio aspect-square rounded-full" alt={item.name} />
              <div className="flex flex-col">
                <p className="w-full font-bold text-sm">
                  {item.name}
                </p>
                <p className="w-full text-sm text-zinc-400">
                  {item.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Featured playlists</h3>
        <div className="flex flex-row gap-4 w-full">
          {featuredPlaylist.items.map((playlist: Playlist) => (
            <div key={playlist.id} className="flex flex-col items-start gap-2 min-w-44 max-w-32 overflow-hidden">
              <img src={playlist.images[0].url} className="min-w-44 max-w-32 ratio aspect-square" alt={playlist.name} />
              <div className="flex flex-col">
                <p className="w-full font-bold text-sm whitespace-nowrap text-ellipsis">
                  {playlist.name} /n
                </p>
                <p className="w-full text-sm text-zinc-400">
                  {playlist.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
