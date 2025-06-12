import React from 'react'

const Search = ({ search, setSearch }) => {
  return (
    <div className="search">
      <div>
        <img src="search.png" alt="search" />

        <input
          type="text"
          placeholder="Search for your movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>
    </div>
  )
}
export default Search