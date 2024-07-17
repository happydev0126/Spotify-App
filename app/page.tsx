import { getFeaturedPlaylists, getRecentlyPlayed, getUsersTopItems } from "./api/spotify/spotify-api";
import { Item } from "./types/spotify";
import Track from "./components/track/Track";
import { getToken } from "./api/clerk/getToken";
import TrackList from "./components/TrackSourceCard";

export default async function Page() {
  const recentlyPlayed = await getRecentlyPlayed(6).then(data => data.items)
  const usersTopArtists = await getUsersTopItems('artists', 6).then(data => data.items)
  const featuredPlaylist = await getFeaturedPlaylists(6).then(data => data.playlists)
  const token = await getToken()
  let uris = ['']

  const removeDuplicates = (items: Item[]) => {
    const seenItems = new Set()
    const itemsNoDup = items.filter(item => {
      const value = item.track.id
      if (seenItems.has(value)) {
        return false
      }
      seenItems.add(value)
      return true
    })
    uris = itemsNoDup.map(item => item.track.uri)
    return itemsNoDup
  }

  return (
    <div className="overflow-y-scroll overflow-x-hidden gap-8 flex flex-col">
      <section className="flex flex-col gap-4 ">
        <h3 className="text-2xl font-bold">Recently played tracks</h3>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
          {removeDuplicates(recentlyPlayed).map((item, index) => (
            <Track token={token} key={item.track.id} item={item.track} index={index} uris={uris} variant="trackOnly" />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4 ">
        <h3 className="text-2xl font-bold">Your favorite artists</h3>
        {(usersTopArtists.length < 1) ? <div className="text-xs italic">You dont have favorite artists yet</div> :
          <TrackList list={usersTopArtists} />
        }
      </section>
      <section className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Featured playlists</h3>
        <TrackList list={featuredPlaylist.items} />
      </section>
    </div>
  );
}
