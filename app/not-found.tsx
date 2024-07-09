import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex flex-col'>
      <h2>Could not find requested resource</h2>
      <Link href="/" className='bg-green/80 px-4 py-2 rounded-full hover:bg-green w-max'>Return Home</Link>
    </div>
  )
}
