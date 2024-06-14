'use client'
import React, { useEffect, useState } from 'react'
import { CurrentUserItem } from '../types/spotify'
import Link from 'next/link'

export default function UserPlaylists({ playlists }: { playlists: CurrentUserItem[] }) {
  const [userPlaylists, setUserPlaylists] = useState<CurrentUserItem[]>()
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    setUserPlaylists(playlists)
  }, [playlists])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  if (!playlists) {
    return <div>No playlists found</div>
  }

  return (
    <div className='flex flex-col'>
      <form>
        <input
          className='rounded-2xl bg-gray-600/20 px-2'
          placeholder='Search in your library'
          onChange={(e) => handleSearch(e)}
          type="text"
        />
      </form>
      {userPlaylists?.filter(usePlaylist => usePlaylist.name.includes(searchInput))?.map((playlist) => (
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

