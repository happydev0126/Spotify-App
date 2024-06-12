import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { getRecentlyPlayed } from "./api/spotify/spotify-api";
import { UserButton } from "@clerk/nextjs";
import Tag from "./components/tag";
import { Item } from "./types/spotify";

export default async function Page() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();
  let recentlyPlayed: Item[] = []
  if (userId) {
    const provider = 'oauth_spotify';
    const token = await clerkClient.users.getUserOauthAccessToken(userId, provider).then(data => data.data[0].token)
    recentlyPlayed = await getRecentlyPlayed(token, 6).then(data => data.items)
  }

  // Get the Backend API User object when you need access to the user's information

  // Use `user` to render user details or create UI elements
  return (
    <div>
      <header className="flex justify-between">
        <div className="flex flex-row gap-4">
          <button> {' < '} </button>
          <button>{' > '}</button>
        </div>
        <UserButton />
      </header>
      <div className="row flex gap-2">
        <Tag title={'All'} />
        <Tag title={'Music'} />
        <Tag title={'Podcasts'} />
      </div>
      <section className="grid grid-cols-2 gap-4  xl:grid-cols-3">
        {recentlyPlayed.map((item) => (
          <div key={item.track.id} className="flex flex-row items-center">
            <img src={item.track.album.images[0].url} className="w-14 rounded" alt="" />
            <span className="flex h-full w-full items-center bg-white/10 p-2 font-bold">
              {item.track.album.name}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
