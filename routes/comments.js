const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.get("/", CommentsController.getAllComments);
router.post("/", CommentsController.createComment);
router.post("/likes", CommentsController.likeComment);
router.delete("/likes", CommentsController.unlikeComment);


module.exports = router;
