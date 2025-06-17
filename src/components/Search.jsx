import React from 'react'

const Search = ({ search, setSearch }) => {
  return (
    <div className="search flex justify-center mt-6">
      <div className="relative w-full max-w-md">
        {/* Glowing effect wrapper */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-md opacity-60 animate-spin-slow z-0" />

        {/* Actual search bar */}
        <div className="relative z-10 flex items-center bg-black border border-gray-700 rounded-full px-5 py-3 w-full">
          <img src="search.png" alt="search" className="w-5 h-5 mr-3" />

          <input
            type="text"
            placeholder="Search for your movies"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
          />
        </div>
      </div>
    </div>
  )
}

export default Search
