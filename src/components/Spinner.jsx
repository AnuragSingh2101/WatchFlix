import React from 'react'

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]" role="status">
      <svg
        className="w-16 h-16 animate-spin"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />      {/* indigo-500 */}
            <stop offset="50%" stopColor="#8b5cf6" />     {/* violet-500 */}
            <stop offset="100%" stopColor="#ec4899" />    {/* pink-500 */}
          </linearGradient>
        </defs>
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="url(#spinner-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="90"
          strokeDashoffset="60"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Spinner
