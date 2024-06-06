import React from 'react'
import Card from './card'

export default function Dashboard() {
  return (
    <div className='flex flex-col gap-2 h-full'>
      <Card>
        <div>
          🏠 Home
        </div>
        <div>
          🔍 Search
        </div>
      </Card>
      <Card >
        <div>
          📚 Your library
        </div>
      </Card>
    </div>
  )
}

