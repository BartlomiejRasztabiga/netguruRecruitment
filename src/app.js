import express from "express"
import logger from "morgan"
import bodyParser from "body-parser"
import routes from "./routes"

const app = express()
//app.disable("x-powered-by")

// Enable Morgan Logger
app.use(logger("dev"))

// Enable BodyParser to retrieve POST body as JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
app.use("/", routes)

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found")
  err.status = 404
  next(err)
})

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status).send("Something broke: ", {
    message: err.message
  })
})

// Listen on port 8080
app.listen(8080, () => console.log("App listening on port 8080"))

export default app
