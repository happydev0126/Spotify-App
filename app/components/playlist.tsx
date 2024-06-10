'use client'
import React, { useEffect, useState } from 'react'
import { CurrentUserPlaylistItem } from '../types/spotify'
import Link from 'next/link'

export default function UserPlaylists({ playlists }: { playlists: CurrentUserPlaylistItem[] }) {
  const [userPlaylists, setUserPlaylists] = useState<CurrentUserPlaylistItem[]>()

  // const searchPlaylist = () => {
  //    let filteredPlaylist = userPlaylists?.filter(playlist => )
  // }

  useEffect(() => {
    setUserPlaylists(playlists)
  }, [playlists])

  return (
    <div className='flex flex-col gap-4'>
      {userPlaylists?.map((playlist) => (
        <div key={playlist.id} className='flex flex-row items-center gap-2'>
          <Link href={`/playlist/${playlist.id}`}>
            <img src={playlist.images[0].url} alt='Image' className='max-w-12 rounded'></img>
            <div>{playlist.name}</div>
          </Link>
        </div>
      ))}
    </div>
  )
}

