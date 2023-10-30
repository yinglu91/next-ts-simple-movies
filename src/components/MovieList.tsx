import React from 'react'
import MovieCard from './MovieCard'

type Props = {
  movies: MovieType[]
}

const MovieList = async ({ movies }: Props) => {
  console.log(`MovieList`)
  return (
    <>
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
    </>
  )
}

export default MovieList
