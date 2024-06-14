export default function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`flex w-full min-w-64 flex-col gap-5 rounded bg-background-alt p-5 overflow-hidden ${className}`} > {children}</ div>
  )
}

