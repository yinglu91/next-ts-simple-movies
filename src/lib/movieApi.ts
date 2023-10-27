const API_URL = 'http://www.omdbapi.com?apikey=b6003d8a'

type ResponseType = {
    Search: MovieType[]
  }

export const getMovies = async (title = 'war'): Promise<ResponseType> => {
  const url = `${API_URL}&s=${title}`
  
  console.log(`url=${url}`)
  // url=http://www.omdbapi.com?apikey=b6003d8a&s=war

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch movies.')
  }

  return response.json()
}
