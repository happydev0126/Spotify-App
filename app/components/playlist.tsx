'use client'
import React, { useEffect, useState } from 'react'
import { CurrentUserItem } from '../types/spotify'
import Link from 'next/link'

export default function UserPlaylists({ playlists }: { playlists: CurrentUserItem[] }) {
  const [userPlaylists, setUserPlaylists] = useState<CurrentUserItem[]>()

  useEffect(() => {
    setUserPlaylists(playlists)
  }, [playlists])

  if (!playlists) {
    return <div>No playlists found</div>
  }

  return (
    <div className='flex flex-col'>
      {userPlaylists?.map((playlist) => (
        <Link key={playlist.id} href={`/playlist/${playlist.id}`} className='p-2 rounded hover:bg-gradient-to-r from-white/0 to-white/5'>
          <div className='flex flex-row items-center gap-2'>
            <img src={playlist.images[0].url} alt='Image' className='max-w-12 rounded'></img>
            <div className='flex flex-col'>
              <div className=''>{playlist.name}</div>
              <span className='text-gray-400 text-sm'>{playlist.type} - {playlist.owner.display_name}</span>
            </div>
          </div >
        </Link >
      ))
      }
    </div >
  )
}

