const API_URL = `http://www.omdbapi.com?apikey=${process.env.MOVIE_API_KEY}`

type ResponseType = {
    Search?: MovieType[],
    totalResults?: number,
    Response: string,  //"False",
    Error?: string, //"Movie not found!"
  }

export const getMovies = async (title: string, page: string|number): Promise<ResponseType> => {
  const url = `${API_URL}&s=${title}&page=${page}`
  
  console.log(`url=${url}`)
  // url=http://www.omdbapi.com?apikey=xxxx&s=war

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch movies.')
  }

  return response.json()
}
