import axios from "axios"
import Movie from "../../api/movie"

const OMDB_API_URL = "http://www.omdbapi.com/?apikey=28f23e99"

export const getMovies = () => Movie.find({})

export const addMovie = async movieDetails => {
  let newMovie = new Movie(movieDetails)

  return newMovie.save()
}

export const retrieveMovieDetails = async movieTitle => {
  let response = await axios.get(OMDB_API_URL + "&t=" + movieTitle)
  let movieDetails = response.data

  return movieDetails
}
