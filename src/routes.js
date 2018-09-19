import { Router } from "express"
import Movie from "./api/movie"
import axios from "axios"

const routes = Router()
const OMDB_API_URL = "http://www.omdbapi.com/?apikey=28f23e99"

/**
 * POST /movies
 */
routes.post("/movies", async (req, res, next) => {
  console.log(req.body)

  const newMovieTitle = req.body.title

  if (!newMovieTitle) {
    res.status(400).json({ errorMessage: "Field 'title' is required" })
    return
  }

  let response = await axios.get(OMDB_API_URL + "&t=" + newMovieTitle)
  let movieDetails = response.data

  let newMovie = new Movie(movieDetails)

  newMovie.save(err => {
    if (err) {
      console.error(err)
      res.status(500).json(err)
    } else {
      res.status(201).json(movieDetails)
    }
  })
})

/**
 * GET /movies
 */
routes.get("/movies", (req, res, next) => {
  console.log("get movies")

  res.send(200)
})

/**
 * GET /list
 *
 * This is a sample route demonstrating
 * a simple approach to error handling and testing
 * the global error handler. You most certainly want to
 * create different/better error handlers depending on
 * your use case.
 */
routes.get("/list", (req, res, next) => {
  const { title } = req.query

  if (title == null || title === "") {
    // You probably want to set the response HTTP status to 400 Bad Request
    // or 422 Unprocessable Entity instead of the default 500 of
    // the global error handler (e.g check out https://github.com/kbariotis/throw.js).
    // This is just for demo purposes.
    next(new Error('The "title" parameter is required'))
    return
  }

  res.render("index", { title })
})

export default routes
