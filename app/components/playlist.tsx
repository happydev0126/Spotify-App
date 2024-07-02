'use client'
import { useEffect, useState } from 'react'
import { Album, CurrentUserPlaylist } from '../types/spotify'
import Link from 'next/link'

export default function UserPlaylists({ library }: { library: Array<CurrentUserPlaylist | Album> }) {
  const [userLibrary, setUserLibrary] = useState<Array<CurrentUserPlaylist | Album>>()
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    setUserLibrary(library)
  }, [library])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchInput(e.target.value.toLowerCase())
  }

  if (!userLibrary) {
    return <div>No playlists found</div>
  }

  return (
    <div className='flex flex-col'>
      <form>
        <input
          className='bg-stone-500/20 rounded mb-2 w-full px-2 placeholder-gray-300 text-sm p-1'
          placeholder='Search in your library'
          onChange={(e) => handleSearch(e)}
          type="text"
        />
      </form>
      {userLibrary
        ?.filter(userPlaylist => userPlaylist.name.toLowerCase().includes(searchInput))
        .map((playlist) => (
          <Link
            key={`${playlist.id}`}
            href={playlist.type === 'playlist' ? `/playlist/${playlist.id}` : `/album/${playlist.id}`}
            className='p-2 rounded hover:bg-gradient-to-r from-white/0 to-white/5'>
            <div className='flex flex-row items-center gap-2'>
              <img
                src={playlist.images[playlist.images.length - 1].url}
                alt='Image'
                className='max-w-12 rounded'>
              </img>
              <div className='flex flex-col'>
                <div className=''>{playlist.name}</div>
                <span className='text-gray-400 text-sm capitalize'>
                  {playlist.type}
                  {' - '}
                  {'owner' in playlist && playlist.owner.display_name}
                  {
                    'artists' in playlist &&
                    <span>
                      {
                        playlist.artists.map((artist, index) => (
                          <>
                            <Link href={`/artist/${playlist.artists[0].id}`} className="text-xs hover:underline hover:text-white">
                              {artist.name}
                            </Link>
                            {playlist.artists.length > 1 && playlist.artists.length !== index + 1 &&
                              <>
                                {', '}
                              </>
                            }
                          </>
                        ))
                      }
                    </span>
                  }
                </span>
              </div>
            </div>
          </Link >
        ))
      }
    </div >
  )
}

