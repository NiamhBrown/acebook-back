const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.post("/", PostsController.createPost);
router.post("/likes", PostsController.likePost);
router.delete("/likes", PostsController.unlikePost);


module.exports = router;
