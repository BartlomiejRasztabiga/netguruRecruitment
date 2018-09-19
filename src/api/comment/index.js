import mongoose, { Schema } from "mongoose"

const commentSchema = new mongoose.Schema(
  {
    CommentMessage: {
      type: String
    },
    Movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie"
    }
  },
  {
    timestamps: true
  }
)

commentSchema.methods = {
  view() {
    let view = {}
    let fields = ["title", "data"]

    fields.forEach(field => {
      view[field] = this[field]
    })

    return view
  }
}

const model = mongoose.model("Comment", commentSchema)

export const schema = model.schema
export default model
