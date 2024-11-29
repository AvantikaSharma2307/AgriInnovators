import React from 'react'

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg ${className}`}>
    {children}
  </div>
  )
}

