import { getToken } from "@/app/api/clerk/getToken";
import {
  getCurrentUser,
  getPlaylist,
  getUser,
} from "@/app/api/spotify/spotify-api";
import ListTopBar from "@/app/components/ListTopBar";
import Track from "@/app/components/track/Track";
import { getMostCommonColor } from "@/app/lib/utils/getCommonColor";
import Image from "next/image";

export default async function Page({ params }: { params: { slug: string } }) {
  const currentUser = await getCurrentUser();
  const playlist = await getPlaylist(params.slug, currentUser!.country);
  const token = await getToken();
  const owner = await getUser(playlist.owner.id);

  const response = await getMostCommonColor(playlist.images[0].url);

  return (
    <div
      className="flex flex-col overflow-x-hidden overflow-y-scroll"
      // style={{
      //   background: `linear-gradient(to bottom, ${response} 0%, ${response}80 20%, transparent 100%)`,
      // }}
    >
      <div
        className="flex w-full flex-col items-center gap-4 md:flex-row md:items-end"
        style={{
          background: `linear-gradient(to bottom, ${response} 0%, ${response}80 50%, transparent 100%)`,
        }}
      >
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
      <div className="flex flex-col w-full text-sm text-zinc-400">
        <ListTopBar token={token} playlistUri={playlist.uri} />
        <div className="text-zinc-400 grid grid-cols-[24px_minmax(200px,35%)_30%_20%_auto] max-w-full text-sm overflow-hidden gap-x-3 items-center text-left py-1 px-2 rounded max-h-16">
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
