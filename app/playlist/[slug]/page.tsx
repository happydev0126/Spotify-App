import { getToken } from "@/app/api/clerk/getToken";
import {
  getCurrentUser,
  getPlaylist,
  getUser,
} from "@/app/api/spotify/spotify-api";
import Track from "@/app/components/track/Track";
import Image from "next/image";

export default async function Page({ params }: { params: { slug: string } }) {
  const currentUser = await getCurrentUser();
  const playlist = await getPlaylist(params.slug, currentUser!.country);
  const token = await getToken();
  const owner = await getUser(playlist.owner.id);

  return (
    <div className="flex flex-col gap-6 overflow-x-hidden overflow-y-scroll">
      <div className="flex w-full flex-col items-center gap-4 md:flex-row md:items-end">
        <Image
          className="xs:order-2 rounded shadow"
          width={224}
          height={224}
          src={playlist.images[0].url}
          alt={playlist.name}
          priority={true}
        />
        <div className="xs:order-1 flex flex-col gap-4">
          <span className="xs:order-2 capitalize">{playlist.type}</span>
          <h2 className="sm:text:sm xs:order-1 font-bold md:text-xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
            {playlist.name}
          </h2>
          <span className="xs:order-3 italic text-gray-400">
            {playlist.description}
          </span>
          <div className="flex flex-row gap-2">
            {owner?.images[0] && (
              <Image
                width={24}
                height={24}
                src={owner?.images[0].url}
                alt={playlist.owner.display_name}
                className="max-w-6 rounded-2xl"
              />
            )}
            <span className="font-bold">{playlist.owner.display_name} </span>
            <span>{playlist.tracks.total} songs </span>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col text-sm text-zinc-400">
        <div className="grid max-h-16 max-w-full grid-cols-[24px_minmax(200px,35%)_30%_20%_auto] items-center gap-x-3 overflow-hidden rounded px-2 py-1 text-left text-sm text-zinc-400">
          <span className="w-full text-center">#</span>
          <span>Title</span>
          <span>Album</span>
          <span>Date added</span>
          <span className="justify-self-end pr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              data-icon="SvgClock"
              aria-hidden="true"
            >
              <path d="M11.75 2.75a9 9 0 11-6.364 2.636A8.972 8.972 0 0111.75 2.75zm0 5.2v4h4.2"></path>
            </svg>
          </span>
        </div>
        <hr className="mb-4 mt-2 opacity-20" />
        {playlist.tracks.items.map((item, index) => (
          <Track
            variant={"all"}
            token={token}
            key={item.track.id + item.track.album.id}
            item={item.track}
            added_at={item.added_at}
            index={index}
            playlist_uri={playlist.uri}
          />
        ))}
      </div>
    </div>
  );
}
