import React from 'react'
import Card from './card'
import Tag from './tag'
import UserPlaylists from './playlist'
import { CurrentUserPlaylistItem } from '../types/spotify'
import Link from 'next/link'

export default function Dashboard({ playlists }: { playlists: CurrentUserPlaylistItem[] }) {
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
      <Card className='h-full'>
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

