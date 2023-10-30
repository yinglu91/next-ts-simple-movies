import MovieCard from '@/components/MovieCard'
import { getMovies } from '@/lib/movieApi'
import './globals.css'
import Search from '@/components/SearchWithButton'

// http://localhost:3000
// http://localhost:3001/?title=crazy

type Props = {
  searchParams?: {
    title?: string
  }
}

const HomePage = async ({ searchParams }: Props) => {
  const title = searchParams?.title

  const data = await getMovies(title)

  const movies = data.Search

  return (
    <div className='app'>
      <h1>MovieLand</h1>

      <Search />

      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie88={movie}
            />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  )
}

export default HomePage
