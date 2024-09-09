import {
  getFeaturedPlaylists,
  getRecentlyPlayed,
  getUsersTopItems,
} from "./api/spotify/spotify-api";
import { Item } from "./types/spotify";
import Track from "./components/track/Track";
import { getToken } from "./api/clerk/getToken";
import TrackList from "./components/TrackSourceCard";

export default async function Page() {
  const { items: recentlyPlayed } = await getRecentlyPlayed(6);
  const { items: usersTopArtists } = await getUsersTopItems("artists", 6);
  const { playlists: featuredPlaylists } = await getFeaturedPlaylists(6);
  const token = await getToken();

  // const response = await fetch(
  //   `/api/color?url=${encodeURIComponent("https://www.google.com/imgres?q=the%20strokes&imgurl=https%3A%2F%2Fi.scdn.co%2Fimage%2Fab67616d0000b27313f2466b83507515291acce4&imgrefurl=https%3A%2F%2Fopen.spotify.com%2Ftrack%2F7hm4HTk9encxT0LYC0J6oI&docid=ZHt5nyumpPmTuM&tbnid=3ntSjcnOibHNiM&w=640&h=639&hcb=2")}`,
  // );
  const response = await fetch(`/api/color`);

  console.log(response);

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
