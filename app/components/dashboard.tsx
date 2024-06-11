import React from 'react'
import Card from './card'
import Tag from './tag'
import UserPlaylists from './playlist'
import { CurrentUserPlaylistItem, Item } from '../types/spotify'
import Link from 'next/link'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { getCurrentUserPlaylists } from '../api/spotify/spotify-api'

export default async function Dashboard() {
  const { userId } = auth();
  let playlists: CurrentUserPlaylistItem[] = []
  if (userId) {
    const provider = 'oauth_spotify';
    const token = await clerkClient.users.getUserOauthAccessToken(userId, provider).then(data => data.data[0].token)
    playlists = await getCurrentUserPlaylists(token).then(data => data.items)
  }

  return (
    <div className='flex flex-col gap-2 w-3/12'>
      <Card>
        <Link href='/'>
          <div>
            🏠 Home
          </div>
        </Link>
        <div>
          🔍 Search
        </div>
      </Card>
      <Card className='h-full overflow-y-scroll'>
        <div className='flex flex-col gap-5'>
          <div>
            📚 Your library
          </div>
          <div className='flex gap-1'>
            <Tag title='Playlist' />
            <Tag title='Albums' />
            <Tag title='Podcasts' />
          </div>
          <form>
            {/* <label>🔍</label> */}
            <input className='rounded-2xl bg-gray-600/20 px-2' placeholder='Search in your library' type="text" />
          </form>
          <div>
            <UserPlaylists playlists={playlists} />
          </div>
        </div>
      </Card>
    </div>
  )
}

