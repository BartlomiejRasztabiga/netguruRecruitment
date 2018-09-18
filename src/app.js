import express from "express"
import logger from "morgan"
import bodyParser from "body-parser"
import routes from "./routes"
import mongoose from "./services/mongoose"

// Connect to MongoDB instance
const mongoConnectionString = process.env.MONGO_URI
  ? process.env.MONGO_URI
  : "mongodb://localhost/netguru" // connect to specified mongo instance, otherwise use local

const appPort = process.env.PORT || 8080 // 8080 by default, if not otherwise specified

mongoose.connect(
  mongoConnectionString,
  { useNewUrlParser: true }
)
mongoose.Promise = Promise

const app = express()
app.disable("x-powered-by") // security purposes

// Enable Morgan Logger
app.use(logger("dev"))

// Enable BodyParser to retrieve POST body as JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
app.use("/", routes)

// FIX weird 404 errors

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

// Listen on port (by default) 8080
app.listen(appPort, () => console.log("App listening on port " + appPort))

export default app
