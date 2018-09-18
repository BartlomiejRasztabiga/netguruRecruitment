import Promise from "bluebird"
import mongoose from "mongoose"
// import MongodbMemoryServer from "mongodb-memory-server"

// const mongod = new MongodbMemoryServer()

// const uri = await mongod.getConnectionString()
// const port = await mongod.getPort()
// const dbPath = await mongod.getDbPath()
// const dbName = await mongod.getDbName()

mongoose.connect(
  "mongodb://localhost/netguru",
  { useNewUrlParser: true }
)

mongoose.set("useCreateIndex", true)

mongoose.Promise = Promise

mongoose.Types.ObjectId.prototype.view = function() {
  return { id: this.toString() }
}

mongoose.connection.on("error", err => {
  console.error("MongoDB connection error: " + err)
  process.exit(-1)
})

export default mongoose
