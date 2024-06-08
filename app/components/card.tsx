import React from 'react'

export default function Card({ children, height = '' }) {
  return (
    <div className={`flex w-full min-w-64 flex-col gap-5 rounded bg-background-alt p-5 ${height}`} > {children}</ div>
  )
}

