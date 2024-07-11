const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    post: {type: mongoose.Schema.Types.ObjectId, ref: "Post"},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    forename: String,
    surname: String,
    username: String,
    message: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    createdAt: { type: Date, default: Date.now },
});
console.log(CommentSchema);

const Comment = mongoose.model("Comment", CommentSchema);



module.exports = Comment;
