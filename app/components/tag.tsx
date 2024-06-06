import React from 'react'

export default function Tag({ title }: { title: string }) {
  return (
    <div className='rounded-2xl bg-tag max-w-fit px-3 py-0.5'>{title}</div>
  )
}
