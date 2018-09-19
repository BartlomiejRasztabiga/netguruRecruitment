import mongoose from "mongoose"

const movieSchema = new mongoose.Schema(
  {
    Title: {
      type: String
    },
    Year: {
      type: String
    },
    Rated: {
      type: String
    },
    Released: {
      type: String
    },
    Runtime: {
      type: String
    },
    Genre: {
      type: String
    },
    Director: {
      type: String
    },
    Writer: {
      type: String
    },
    Actors: {
      type: String
    },
    Plot: {
      type: String
    },
    Language: {
      type: String
    },
    Country: {
      type: String
    },
    Awards: {
      type: String
    },
    Poster: {
      type: String
    },
    Metascore: {
      type: String
    },
    imdbRating: {
      type: String
    },
    imdbVotes: {
      type: String
    },
    imdbID: {
      type: String
    },
    Type: {
      type: String
    },
    Website: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

movieSchema.methods = {
  view() {
    let view = {}
    let fields = ["title", "data"]

    fields.forEach(field => {
      view[field] = this[field]
    })

    return view
  }
}

const model = mongoose.model("Movie", movieSchema)

export const schema = model.schema
export default model
