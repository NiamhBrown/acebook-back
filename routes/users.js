const express = require("express");

const UsersController = require("../controllers/users");
const tokenChecker = require("../middleware/tokenChecker");
const upload = require("../middleware/multer");
const Test = require("supertest/lib/test");

const router = express.Router();
router.get("/", UsersController.getAllUsers);
router.post("/", UsersController.create);
router.get("/getOneUser", tokenChecker, UsersController.getOneUser);
router.put("/profile", tokenChecker, UsersController.updateUser);

router.post("/friends", tokenChecker, UsersController.addFriend);
router.delete("/friends", tokenChecker, UsersController.removeFriend);

//allows upload of multiple files to /upload folder in AWS bucket 
router.post("/upload", upload.array("file"), tokenChecker, UsersController.addProfilePicture);
// router.delete("/profilePicture", tokenChecker, UsersController.removeProfilePicture);

router.delete("/friends/deny", tokenChecker, UsersController.denyFriend);

module.exports = router;
