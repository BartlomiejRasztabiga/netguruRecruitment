import { Movie } from "../../api/movie"

export const getMovies = () => Movie.find({})

export const addMovie = movie => Movie.create(movie)
