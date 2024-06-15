import React from 'react'
import Card from './card'
import Tag from './tag'
import UserPlaylists from './playlist'
import { CurrentUserItem } from '../types/spotify'
import Link from 'next/link'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { getCurrentUserPlaylists } from '../api/spotify/spotify-api'

export default async function Dashboard() {
  const { userId } = auth();
  let playlists: CurrentUserItem[] = []
  if (userId) {
    const provider = 'oauth_spotify';
    const token = await clerkClient.users.getUserOauthAccessToken(userId, provider).then(data => data.data[0].token)
    playlists = await getCurrentUserPlaylists(token).then(data => data.items)
  }

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Card>
        <Link href='/'>
          <div className='flex items-center gap-2 text-gray-400'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" data-icon="SvgHome" aria-hidden="true"><path d="M4.75 10.75v9a1.16 1.16 0 00.213.725.717.717 0 00.587.275h12.4a.737.737 0 00.55-.275 1.1 1.1 0 00.25-.725v-9m-16 2l4.5-5 4.5-5 4.5 5 4.5 5m-11.5 8v-5a.945.945 0 011-1h3a.945.945 0 011 1v5"></path></svg>
            Home
          </div>
        </Link>
        {/* TODO */}
        {/* <div className='flex items-center gap-2 text-gray-400'> */}
        {/*   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" data-icon="SvgSearch" aria-hidden="true"><path d="M10.1 3a7.1 7.1 0 11-5.02 2.08A7.074 7.074 0 0110.1 3zM21 21l-2.9-2.9-2.9-2.9"></path></svg> */}
        {/*   Search */}
        {/* </div> */}
      </Card>
      <Card className='flex flex-col overflow-y-scroll h-full'>
        <div className='flex items-center gap-2 text-gray-400'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" width="24" height="24" viewBox="0 0 24 24" data-icon="SvgLibrary" aria-hidden="true"><path d="M20.332 20L16.844 4M12 20V4M6 20V4"></path></svg>
          Your library
        </div>
        {/* TODO */}
        {/* <div className='flex gap-1'> */}
        {/*   <Tag title='Playlist' /> */}
        {/*   <Tag title='Albums' /> */}
        {/*   <Tag title='Podcasts' /> */}
        {/* </div> */}
        <div>
          <UserPlaylists playlists={playlists} />
        </div>
      </Card>
    </div>
  )
}

