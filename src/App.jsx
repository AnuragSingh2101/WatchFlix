// import { useState, useEffect } from "react";
// import "./App.css";

// import Search from "./components/Search";
// import Spinner from "./components/Spinner";
// import MovieCard from "./components/MovieCard";

// import { useDebounce } from "react-use";

// import { getTrendingMovies, updateSearchCount } from './appwrite.js';

// const API_BASE_URL = 'https://api.themoviedb.org/3';
// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// const API_OPTIONS = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: `Bearer ${API_KEY}`
//   }
// };

// const App = () => {
//   const [search, setSearch] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [movieList, setMovieList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [trendingMovies, setTrendingMovies] = useState([]);

//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   // Debounce the search input
//   useDebounce(() => {
//     setDebouncedSearchTerm(search);
//     setCurrentPage(1);
//   }, 1000, [search]);

//   // Fetch movies
//   const fetchMovies = async (query = '', page = 1) => {
//     setIsLoading(true);
//     setErrorMessage('');

//     try {
//       const endpoint = query
//         ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
//         : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

//       const response = await fetch(endpoint, API_OPTIONS);

//       if (!response.ok) {
//         throw new Error("Failed to fetch movies");
//       }

//       const data = await response.json();

//       if (data.results.length === 0 && page === 1) {
//         setErrorMessage("No movies found.");
//         setMovieList([]);
//         setHasMore(false);
//         return;
//       }

//       // Append to previous list unless it's the first page
//       setMovieList((prev) =>
//         page === 1 ? data.results : [...prev, ...data.results]
//       );

//       setHasMore(page < data.total_pages);

//       if (query && page === 1 && data.results.length > 0) {
//         await updateSearchCount(query, data.results[0]);
//       }

//     } catch (error) {
//       console.error("Error fetching movies:", error);
//       setErrorMessage("Error in fetching movies. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch trending movies (from Appwrite backend)
//   const loadTrendingMovies = async () => {
//     try {
//       const movies = await getTrendingMovies();
//       setTrendingMovies(movies);
//     } catch (error) {
//       console.error("Error fetching trending movies:", error);
//     }
//   };

//   // React to changes in debounced search term or page number
//   useEffect(() => {
//     if (debouncedSearchTerm.trim() === '') {
//       // Load popular movies when no search term
//       fetchMovies('', currentPage);
//     } else {
//       if (currentPage === 1) {
//         setMovieList([]); // Clear old results on new search
//       }
//       fetchMovies(debouncedSearchTerm, currentPage);
//     }
//   }, [debouncedSearchTerm, currentPage]);

//   // Initial load of trending movies
//   useEffect(() => {
//     loadTrendingMovies();
//   }, []);

//   // Load more handler
//   const handleLoadMore = () => {
//     if (hasMore && !isLoading) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   };

//   return (
//     <main>
//       <div className="pattern" />
//       <div className="wrapper">
//         <header className="bg-[url('./Background.png')] bg-cover bg-center bg-no-repeat p-10 text-white">
//           <img src="./hero-img.png" alt="Hero Banner" />
//           <h1>
//             Find your <span className="text-gradient">Movies</span> and Enjoy
//             them Without the Hassle
//           </h1>
//           <Search search={search} setSearch={setSearch} />
//         </header>

//         {/* Trending Movies Section */}
//         {trendingMovies.length > 0 && (
//           <section className="trending">
//             <h2>Trending Movies</h2>
//             <ul>
//               {trendingMovies.map((movie, index) => (
//                 <li key={movie.$id}>
//                   <p>{index + 1}</p>
//                   <img src={movie.poster_url} alt={movie.title} />
//                 </li>
//               ))}
//             </ul>
//           </section>
//         )}

//         {/* All Movies Section */}
//         <section className="all-movies">
//           <h2>All Movies</h2>

//           {errorMessage ? (
//             <p className="text-red-500">{errorMessage}</p>
//           ) : (
//             <>
//               <ul>
//                 {movieList.map((movie) => (
//                   <MovieCard key={movie.id} movie={movie} />
//                 ))}
//               </ul>

//               {/* Spinner below movie list for loading more */}
//               {isLoading && currentPage > 1 && <Spinner />}

//               {/* Load More Button */}
//               {hasMore && !isLoading && (
//                 <div className="text-center mt-4">
//                   <button
//                     onClick={handleLoadMore}
//                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                   >
//                     Load More
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </section>
//       </div>
//     </main>
//   );
// };

// export default App;


















import { useState, useEffect } from "react";
import "./App.css";

import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

import { useDebounce } from "react-use";

import { getTrendingMovies, updateSearchCount } from './appwrite.js';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useDebounce(() => {
    setDebouncedSearchTerm(search);
    setCurrentPage(1);
  }, 1000, [search]);

  const fetchMovies = async (query = '', page = 1) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.results.length === 0) {
        setErrorMessage("No movies found.");
        setMovieList([]);
        setHasMore(false);
        return;
      }

      setMovieList(data.results);
      setTotalPages(data.total_pages);
      setHasMore(page < data.total_pages);

      if (query && page === 1 && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }

    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Error in fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm.trim() === '') {
      fetchMovies('', currentPage);
    } else {
      fetchMovies(debouncedSearchTerm, currentPage);
    }
  }, [debouncedSearchTerm, currentPage]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
  <main>
    <div className="pattern" />
    <div className="wrapper">
      <header className="bg-[url('./Background.png')] bg-cover bg-center bg-no-repeat p-10 text-white">
        <img src="./hero-img.png" alt="Hero Banner" />
        <h1>
          Find your <span className="text-gradient">Movies</span> and Enjoy
          them Without the Hassle
        </h1>
        <Search search={search} setSearch={setSearch} />

        {/* Loader below search bar only when no movies yet */}
        {isLoading && movieList.length === 0 && (
          <div className="mt-4 flex justify-center">
            <Spinner />
          </div>
        )}
      </header>

      {/* Trending Section */}
      {trendingMovies.length > 0 && (
        <section className="trending">
          <h2>Trending Movies</h2>
          <ul>
            {trendingMovies.map((movie, index) => (
              <li key={movie.$id}>
                <p>{index + 1}</p>
                <img src={movie.poster_url} alt={movie.title} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Movie Results Section */}
      <section className="all-movies">
        <h2>All Movies</h2>

        {/* Error message */}
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        {/* Movie List */}
        {!errorMessage && (
          <>
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>

            {/* Pagination Arrows */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={goToPreviousPage}
                className={`px-4 py-2 bg-gray-700 text-white rounded ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                }`}
                disabled={currentPage === 1}
              >
                ← Prev
              </button>

              <span className="text-white">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={goToNextPage}
                className={`px-4 py-2 bg-gray-700 text-white rounded ${
                  !hasMore ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                }`}
                disabled={!hasMore}
              >
                Next →
              </button>
            </div>

            {/* Loader while switching pages */}
            {isLoading && movieList.length > 0 && (
              <div className="mt-4 flex justify-center">
                <Spinner />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  </main>
);
};

export default App;
