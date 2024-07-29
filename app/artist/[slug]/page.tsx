import { getToken } from "@/app/api/clerk/getToken";
import {
  getArtist,
  getArtistAlbums,
  getArtistTopTracks,
} from "@/app/api/spotify/spotify-api";
import TrackList from "@/app/components/TrackSourceCard";
import Track from "@/app/components/track/Track";
import Image from "next/image";

export default async function Page({ params }: { params: { slug: string } }) {
  const artist = await getArtist(params.slug);
  const topTracks = await getArtistTopTracks(params.slug).then(
    (data) => data?.tracks,
  );
  const albums = await getArtistAlbums(params.slug);
  const token = await getToken();
  const uris = topTracks.map((track) => track.uri);

  return (
    <div className="flex flex-col gap-6 overflow-x-hidden overflow-y-scroll">
      {artist && (
        <div className="flex w-full flex-col items-center gap-4 md:flex-row md:items-end">
          <Image
            className="xs:order-2 max-w-56 rounded shadow"
            width={224}
            height={224}
            src={artist.images[0].url}
            alt={artist.name}
            priority={false}
          />
          <div className="xs:order-1 flex flex-col gap-4">
            <span className="xs:order-2 capitalize">{artist.type}</span>
            <h2 className="sm:text:sm xs:order-1 font-bold md:text-xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
              {artist.name}
            </h2>
          </div>
        </div>
      )}

      {topTracks && (
        <div className="flex w-full flex-col text-sm text-zinc-400">
          <h3 className="text-4xl font-bold text-white">Popular</h3>
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
