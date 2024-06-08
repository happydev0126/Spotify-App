import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { getLibraries } from "./api/spotify/spotify-api";
import LibraryList from "./components/library";

export default async function Page() {

  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();
  // const auths = auth()
  // const token = await auths.getToken()

  const provider = 'oauth_spotify';

  const token = await clerkClient.users.getUserOauthAccessToken(userId, provider).then(data => data.data[0].token)

  const libraries = await getLibraries(token).then(data => data.items)
  console.log({ libraries })

  if (userId) {
    console.log({ userId })
    // Query DB for user specific information or display assets only to signed in users
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser().then(data => data?.externalAccounts)

  // Use `user` to render user details or create UI elements
  return (
    <div>
      <LibraryList libraryList={libraries} />
      Hello world
    </div>
  )
}
