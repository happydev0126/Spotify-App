export default function Tag({ title }: { title: string }) {
  return (
    <div className='max-w-fit rounded-2xl bg-tag px-3 py-0.5'>{title}</div>
  )
}
