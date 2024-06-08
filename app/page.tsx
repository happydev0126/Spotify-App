import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { getLibraries, getRecentlyPlayed } from "./api/spotify/spotify-api";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Card from "./components/card";
import Dashboard from "./components/dashboard";
import Link from "next/link";
import Tag from "./components/tag";
import { Item, RecentlyPlayed } from "./types/spotify";

export default async function Page() {

  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();
  let libraries = []
  let recentlyPlayed: Item[] = []
  if (userId) {
    const provider = 'oauth_spotify';
    const token = await clerkClient.users.getUserOauthAccessToken(userId, provider).then(data => data.data[0].token)
    libraries = await getLibraries(token).then(data => data.items)
    recentlyPlayed = await getRecentlyPlayed(token, 6).then(data => data.items)
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser().then(data => data?.externalAccounts)

  // Use `user` to render user details or create UI elements
  return (

    <div className="flex min-h-screen flex-row justify-between w-full bg-background gap-2 p-2">
      <SignedIn>
        <Dashboard libraries={libraries} />
        {/* main view */}
        <Card>
          <header className="flex justify-between">
            <div>
              <button> {' < '} </button>
              <button>{' > '}</button>
            </div>
            <UserButton />
          </header>
          <div className="flex row gap-2">
            <Tag title={'All'} />
            <Tag title={'Music'} />
            <Tag title={'Podcasts'} />
          </div>
          <section className="grid grid-cols-2 xl:grid-cols-3  gap-4">
            {recentlyPlayed.map((item) => (
              <div key={item.track.id} className="flex flex-row items-center">
                <img src={item.track.album.images[0].url} className="w-14 rounded" alt="" />
                <span className="bg-white/10 w-full h-full p-2 flex items-center font-bold">
                  {item.track.album.name}
                </span>
              </div>
            ))}

          </section>
        </Card>
        {/* end main view */}
      </SignedIn>
    </div>
  )
}
