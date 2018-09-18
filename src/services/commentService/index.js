import Comment from "../../api/comment"

export const getComments = async movieID => {
  if (movieID) {
    return Comment.find({ Movie: movieID })
  }

  return Comment.find({})
}

export const addComment = async (movieID, commentMessage) => {
  let newComment = new Comment({
    Movie: movieID,
    CommentMessage: commentMessage
  })

  return newComment.save()
}
