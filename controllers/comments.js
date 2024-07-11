const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const { generateToken } = require("../lib/token");

const getAllComments = async (req, res) => {
    const comments = await Comment.find().sort({ createdAt: 1 }); //sorts post in ascending order of createdAt
    const token = generateToken(req.user_id);
    res.status(200).json({ comments: comments, token: token });
};

const createComment = async (req, res) => {
    const message  = req.body.message;
    const userId = req.user_id;
    const postId = req.body.postId;

    if (!message) {
        return res.status(400).json({ message: "Message is required" });
    }

    try {
        const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
        const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    };

    const comment = new Comment({
        post: postId,
        user: userId,
        message: message,
        forename: user.forename,
        surname: user.surname,
        username: user.username
    });
    await comment.save();

    post.comments.push(comment._id);

    await post.save();
    //this line is new
    const populatedPost = await Post.findById(postId).populate('comments');

    const newToken = generateToken(req.user_id);
    res.status(201).json({ message: "Comment created", token: newToken, comment:comment, post: populatedPost});
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
}};

const likeComment = async (req, res) => {
    
    try {
        const commentId = req.body.commentId;
        const userId = req.user_id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
    }

    if (!comment.likes.includes(userId)) {
        comment.likes.push(userId);
        await comment.save();
    }
    const newToken = generateToken(req.user_id);
    res.status(200).json({ message: "Comment liked", token: newToken });
} catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error" });
}};

const unlikeComment = async (req, res) => {
    try {
        const commentId = req.body.commentId;
        const userId = req.user_id;

        const comment = await Comment.findById(commentId);
    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }

    const likeIndex = comment.likes.indexOf(userId);
    if (likeIndex === -1) {
        return res.status(400).json({ message: "Comment not liked yet" });
    }

    comment.likes.splice(likeIndex, 1);
    await comment.save();

    const newToken = generateToken(req.user_id);
    res.status(200).json({ message: "Comment unliked", token: newToken });
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const CommentsController = {
    getAllComments: getAllComments,
    createComment: createComment,
    likeComment: likeComment,
    unlikeComment: unlikeComment,
};

module.exports = CommentsController;
