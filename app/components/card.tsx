import React from 'react'

export default function Card({ children }) {
  return (
    <div className='flex h-fit w-full flex-col gap-5 rounded bg-background-alt p-5'>{children}</div>
  )
}

