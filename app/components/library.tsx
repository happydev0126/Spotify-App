'use client'
import React, { useEffect, useState } from 'react'

export default function LibraryList({ libraryList }: { libraryList: [] }) {
  const [userLibraryList, setUserLibraryList] = useState([])

  useEffect(() => {
    setUserLibraryList(libraryList)
  }, [libraryList])

  return (
    <div className='flex flex-col gap-4'>
      {userLibraryList?.map((library) => (
        <div key={library.id} className='flex flex-row gap-2 items-center'>
          <img src={library.images[0].url} alt='Image' className='max-w-12 rounded'></img>
          <div>{library.name}</div>
        </div>
      ))}
    </div>
  )
}

