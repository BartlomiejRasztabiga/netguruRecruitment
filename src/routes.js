import { Router } from "express"
import {
  addMovie,
  retrieveMovieDetails,
  getMovies,
  isMovieExisting
} from "./services/movieService"
import { addComment, getComments } from "./services/commentService"

const routes = Router()

/**
 * POST /movies
 */
routes.post("/movies", async (req, res) => {
  const movieTitle = req.body.title

  if (!movieTitle) {
    res.status(400).json({ errorMessage: "Field 'title' is required" })
    return
  }

  let movieDetails = await retrieveMovieDetails(movieTitle)

  if (movieDetails) {
    addMovie(movieDetails).then((movie, err) => {
      if (err) {
        console.error(err)
        res.status(500).json(err)
      } else {
        res.status(201).json(movie)
      }
    })
  } else {
    res.status(404).json({ message: "Movie with given title does not exist" })
  }
})

/**
 * GET /movies
 */
routes.get("/movies", async (req, res) => {
  let movies = await getMovies()

  // TODO: add filtering

  res.status(200).json(movies)
})

/**
 * POST /comments
 */
routes.post("/comments", async (req, res) => {
  const movieID = req.body.movieID
  const commentMessage = req.body.commentMessage

  if (!movieID) {
    res.status(400).json({ errorMessage: "Field 'movieID' is required" })
    return
  }

  if (!commentMessage) {
    res.status(400).json({ errorMessage: "Field 'commentMessage' is required" })
    return
  }

  if (!(await isMovieExisting(movieID))) {
    res.status(400).json({ errorMessage: "Movie with given ID does not exist" })
    return
  }

  addComment(movieID, commentMessage).then((comment, err) => {
    if (err) {
      console.error(err)
      res.status(500).json(err)
    } else {
      res.status(201).json(comment)
    }
  })
})

/**
 * GET /comments
 */
routes.get("/comments", async (req, res, next) => {
  const movieID = req.query.movieID
  let comments = await getComments(movieID)

  res.status(200).json(comments)
})

export default routes
