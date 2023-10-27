import MovieCard from '@/components/MovieCard'
import { getMovies } from '@/lib/movieApi'
import './globals.css'

// http://localhost:3000

const HomePage = async () => {
  const data = await getMovies()

  const movies = data.Search

  return (
    <div className='app'>
      <h1>MovieLand</h1>

      <div className='container'>
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie88={movie}
          />
        ))}
      </div>
    </div>
  )
}

export default HomePage
