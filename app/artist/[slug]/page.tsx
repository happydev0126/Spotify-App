import { getToken } from "@/app/api/clerk/getToken";
import {
  getArtist,
  getArtistAlbums,
  getArtistTopTracks,
} from "@/app/api/spotify/spotify-api";
import TrackList from "@/app/components/TrackSourceCard";
import Track from "@/app/components/track/Track";

export default async function Page({ params }: { params: { slug: string } }) {
  const artist = await getArtist(params.slug);
  const topTracks = await getArtistTopTracks(params.slug).then(
    (data) => data?.tracks,
  );
  const albums = await getArtistAlbums(params.slug);
  const token = await getToken();
  const uris = topTracks.map((track) => track.uri);

  return (
    <div className="overflow-y-scroll overflow-x-hidden gap-6 flex flex-col">
      {artist && (
        <div className="flex flex-col items-center md:flex-row md:items-end w-full gap-4">
          <img
            className="shadow xs:order-2 max-w-56 rounded"
            src={artist.images[0].url}
            alt={artist.name}
          />
          <div className="flex flex-col xs:order-1 gap-4">
            <span className="capitalize xs:order-2">{artist.type}</span>
            <h2 className="sm:text:sm md:text-xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold xs:order-1">
              {artist.name}
            </h2>
          </div>
        </div>
      )}

      {topTracks && (
        <div className="flex flex-col w-full text-sm text-zinc-400">
          <h3 className="text-4xl text-white font-bold">Popular</h3>
          {topTracks.map((track, index: number) => (
            <Track
              variant="trackOnly"
              token={token}
              key={track.id}
              item={track}
              index={index}
              uris={uris}
            />
          ))}
        </div>
      )}

      {albums && (
        <section className="flex flex-col gap-4 ">
          <h3 className="text-2xl font-bold">Albums</h3>
          <TrackList list={albums.items} />
        </section>
      )}
    </div>
  );
}
