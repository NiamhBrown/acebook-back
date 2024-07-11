const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  forename: String,
  surname: String,
  username: String,
  message: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
  createdAt: { type: Date, default: Date.now },
});
console.log(PostSchema);

// We use the Schema to create the Post model. Models are classes which we can
// use to construct entries in our Database.
const Post = mongoose.model("Post", PostSchema);

// These lines will create a test post every time the server starts.
// You can delete this once you are creating your own posts.
// const dateTimeString = new Date().toLocaleString("en-GB");
// const testUserId = "6656eb0aacc71b0154e0ebaa";
// new Post({ user: testUserId, message: `Test message, created at ${dateTimeString}` }).save();

module.exports = Post;
