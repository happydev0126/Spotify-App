import { getToken } from "@/app/api/clerk/getToken";
import { getAlbum, getCurrentUser } from "@/app/api/spotify/spotify-api";
import Track from "@/app/components/track/Track";
import Image from "next/image";

export default async function Page({ params }: { params: { slug: string } }) {
  const currentUser = await getCurrentUser();
  const album = await getAlbum(params.slug, currentUser!.country);
  const token = await getToken();

  if (!album) {
    return <div>No album found</div>;
  }

  return (
    <div className="overflow-y-scroll overflow-x-hidden gap-6 flex flex-col">
      <div className="flex flex-col items-center md:flex-row md:items-end w-full gap-4">
        {album.images.length > 0 ? (
          <Image
            className="shadow xs:order-2 rounded"
            width={224}
            height={224}
            src={album.images[0].url}
            alt={album.name}
          />
        ) : (
          <div className="w-40 h-40 flex items-center justify-center bg-zinc-800 rounded">
            <svg
              data-encore-id="icon"
              role="img"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="gray"
              className="w-12 h-12"
            >
              <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"></path>
              <path d="M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-4 2a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"></path>
            </svg>
          </div>
        )}
        <div className="flex flex-col xs:order-1 gap-4">
          <span className="capitalize xs:order-2">{album.type}</span>
          <h2 className="sm:text:sm md:text-xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold xs:order-1">
            {album.name}
          </h2>
        </div>
      </div>
      <div className="flex flex-col w-full text-sm text-zinc-400">
        <h4 className="text-4xl text-white font-bold">Tracks</h4>
        {album.tracks.items.map((track, index: number) => (
          <Track
            variant="trackOnly"
            token={token}
            key={track.id}
            item={track}
            index={index}
            playlist_uri={album.uri}
          />
        ))}
      </div>
    </div>
  );
}
