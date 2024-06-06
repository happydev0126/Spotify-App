import React from 'react'

export default function Card({ children, height = '' }) {
  return (
    <div className={`flex w-full flex-col gap-5 rounded bg-background-alt p-5 min-w-64 ${height}`} > {children}</ div>
  )
}

