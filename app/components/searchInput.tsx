'use client'

import { usePathname, useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function SearchInput({ placeholder }: { placeholder?: string }) {
  const router = useRouter()
  const path = usePathname()
  const [query, setQuery] = useState('')
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (path.includes('/search/')) {
      router.push(query)
    } else {
      router.push(`./search/${query}`)
    }
  }
  return (
    <form onSubmit={e => handleSearch(e)}>
      <input
        className='bg-stone-500/20 rounded-full mb-2 w-full px-2 placeholder-gray-300 text-sm p-1'
        placeholder={placeholder}
        onChange={(e) => setQuery((e.target.value).toLowerCase())}
        type="text"
      />
    </form>
  )
}

