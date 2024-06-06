import React from 'react'
import Card from './card'
import Tag from './tag'

export default function Dashboard() {
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
        </div>
      </Card>
    </div>
  )
}

