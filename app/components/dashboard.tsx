import React from 'react'
import Card from './ui/card'
import UserPlaylists from './playlist'
import { Album, CurrentUserPlaylist } from '../types/spotify'
import Link from 'next/link'
import { getCurrentUserPlaylists, getUsersAlbums } from '../api/spotify/spotify-api'

export default async function Dashboard() {
  let playlists = await getCurrentUserPlaylists().then(data => data.items)
  let albums = await getUsersAlbums()

  let library: Array<CurrentUserPlaylist | Album> = [...playlists]
  albums?.items.forEach(({ album }) => {
    library.push(album)
  })

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Card>
        <Link href='/'>
          <div className='flex items-center gap-2 text-gray-400'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" data-icon="SvgHome" aria-hidden="true"><path d="M4.75 10.75v9a1.16 1.16 0 00.213.725.717.717 0 00.587.275h12.4a.737.737 0 00.55-.275 1.1 1.1 0 00.25-.725v-9m-16 2l4.5-5 4.5-5 4.5 5 4.5 5m-11.5 8v-5a.945.945 0 011-1h3a.945.945 0 011 1v5"></path></svg>
            Home
          </div>
        </Link>
        <Link href='/search'>
          <div className='flex items-center gap-2 text-gray-400'>
            Search
          </div>
        </Link>
      </Card>
      <Card className='flex flex-col overflow-y-scroll h-full'>
        <div className='flex items-center gap-2 text-gray-400'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" width="24" height="24" viewBox="0 0 24 24" data-icon="SvgLibrary" aria-hidden="true"><path d="M20.332 20L16.844 4M12 20V4M6 20V4"></path></svg>
          Your library
        </div>
        {/* TODO 
          Add library filters
        */}
        <div>
          <UserPlaylists library={library} />
        </div>
      </Card>
    </div>
  )
}

