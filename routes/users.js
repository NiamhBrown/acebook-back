const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
const tokenChecker = require("../middleware/tokenChecker");
const upload = require("../middleware/multer");
const Test = require("supertest/lib/test");

router.get("/", UsersController.getAllUsers);
router.post("/", UsersController.create);
router.get("/getSignedInUser", tokenChecker, UsersController.getSignedInUser);
router.get("/getUser", tokenChecker, UsersController.getUser);
router.put("/profile", tokenChecker, UsersController.updateUser);

router.post("/friends", tokenChecker, UsersController.addFriend);
router.delete("/friends", tokenChecker, UsersController.removeFriend);
router.delete("/friends/deny", tokenChecker, UsersController.denyFriend);

//allows upload of multiple files to /upload folder in AWS bucket using multer
router.post("/upload", upload.array("file"), tokenChecker, UsersController.addProfilePicture);

module.exports = router;
