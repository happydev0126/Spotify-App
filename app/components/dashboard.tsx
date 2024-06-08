import React from 'react'
import Card from './card'
import Tag from './tag'
import LibraryList from './library'

export default function Dashboard({ libraries }: { libraries: [] }) {
  return (
    <div className='flex flex-col gap-2'>
      <Card>
        <div>
          🏠 Home
        </div>
        <div>
          🔍 Search
        </div>
      </Card>
      <Card height={'h-full'}>
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
            <LibraryList libraryList={libraries} />
          </div>
        </div>
      </Card>
    </div>
  )
}

