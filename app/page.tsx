import {
  getFeaturedPlaylists,
  getRecentlyPlayed,
  getUsersTopItems,
} from "./api/spotify/spotify-api";
import { Item } from "./types/spotify";
import Track from "./components/track/Track";
import { getToken } from "./api/clerk/getToken";
import TrackList from "./components/TrackSourceCard";
import { getMostCommonColor } from "./lib/utils/getCommonColor";

export default async function Page() {
  const { items: recentlyPlayed } = await getRecentlyPlayed(6);
  const { items: usersTopArtists } = await getUsersTopItems("artists", 6);
  const { playlists: featuredPlaylists } = await getFeaturedPlaylists(6);
  const token = await getToken();

  const removeDuplicates = (items: Item[]) => {
    const seenItems = new Set();
    const itemsWithoutDuplicates = items.filter((item) => {
      const value = item.track.id;
      if (seenItems.has(value)) {
        return false;
      }
      seenItems.add(value);
      return true;
    });
    return itemsWithoutDuplicates;
  };

  let recentTracks = removeDuplicates(recentlyPlayed);
  let recentTracksUris = recentTracks.map(({ track }) => track.uri);

  return (
    <div className="flex flex-col gap-8 overflow-x-hidden overflow-y-scroll">
      <section className="flex flex-col gap-4 ">
        <h3 className="text-2xl font-bold">Recently played tracks</h3>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
          {removeDuplicates(recentlyPlayed).map((item, index) => (
            <Track
              token={token}
              key={item.track.id}
              item={item.track}
              index={index}
              uris={recentTracksUris}
              variant="trackOnly"
            />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4 ">
        <h3 className="text-2xl font-bold">Your favorite artists</h3>
        {usersTopArtists.length < 1 ? (
          <div className="text-xs italic">
            You dont have favorite artists yet
          </div>
        ) : (
          <TrackList list={usersTopArtists} />
        )}
      </section>
      <section className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Featured playlists</h3>
        <TrackList list={featuredPlaylists.items} />
      </section>
    </div>
  );
}
