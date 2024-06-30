import { getPlaylist, getUser, search } from "@/app/api/spotify/spotify-api";
import { Playlist } from "@/app/types/spotify";
import { User, auth, clerkClient } from "@clerk/nextjs/server";




export default async function Page({ params }: { params: { slug: string } }) {

  const { userId } = auth();
  let playlist: Playlist | undefined = undefined
  let token: string
  let searchQuery
  if (userId) {
    const provider = 'oauth_spotify';
    token = await clerkClient.users.getUserOauthAccessToken(userId, provider).then(data => data.data[0].token)
    searchQuery = await search(token, params.slug, ['track'])
  }


  return (
    <div>
      search
      <div className="flex flex-col gap-2">
        {searchQuery?.tracks.items.map((track) => (
          <span key={track.id}>{track.name}</span>
        ))}
      </div>

    </div>
  )

}
