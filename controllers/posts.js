const Post = require("../models/post");
const User = require("../models/user");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).populate('comments');; //sorts post in decending order of createdAt
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
  const message  = req.body.message;
  const userId = req.user_id;

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const post = new Post({
      user: userId,
      message: message,
      forename: user.forename,
      surname: user.surname,
      username: user.username
    });
    await post.save();

    const newToken = generateToken(req.user_id);
    res.status(201).json({ message: "Post created", token: newToken, post:post});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }};

const likePost = async (req, res) => {
  
  try {
    const postId = req.body.postId;
    const userId = req.user_id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }
    const newToken = generateToken(req.user_id);
    res.status(200).json({ message: "Post liked", token: newToken });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error" });
}};

const unlikePost = async (req, res) => {
  try {
    const postId = req.body.postId;
    const userId = req.user_id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const likeIndex = post.likes.indexOf(userId);
    if (likeIndex === -1) {
      return res.status(400).json({ message: "Post not liked yet" });
    }

    post.likes.splice(likeIndex, 1);
    await post.save();

    const newToken = generateToken(req.user_id);
    res.status(200).json({ message: "Post unliked", token: newToken });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  likePost: likePost,
  unlikePost: unlikePost,
};

module.exports = PostsController;
