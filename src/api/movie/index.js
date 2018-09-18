import mongoose from "mongoose"
import mongooseKeywords from "mongoose-keywords"

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    data: {
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

//movieSchema.plugin(mongooseKeywords, { paths: ["title", "name"] })

const model = mongoose.model("Movie", movieSchema)

export const schema = model.schema
export default model
