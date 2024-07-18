const express = require("express");

const multer = require("multer");
const { s3Uploadv2 } = require("./s3Service");

const UsersController = require("../controllers/users");
const tokenChecker = require("../middleware/tokenChecker");
const upload = require("../middleware/multer");
const Test = require("supertest/lib/test");

const router = express.Router();
router.get("/", UsersController.getAllUsers);
router.post("/", UsersController.create);
router.get("/getOneUser", tokenChecker, UsersController.getOneUser);
router.put("/profile", tokenChecker, UsersController.updateUser);

// router.get("/profile", UsersController.getOneUser)
// router.get("/profile:{userid}", UsersController.getOneUser)

router.post("/friends", tokenChecker, UsersController.addFriend);
router.delete("/friends", tokenChecker, UsersController.removeFriend);

//comenting out for now to try new multer way with AWS
// router.post(
//   "/profilePicture",
//   tokenChecker,
//   upload.single("profilePicture"),
//   UsersController.addProfilePicture
// );

//from tutorial, will need to move function into controllers
router.post("/upload", upload.array("file"), async (req, res) => {
  try {
    const results = await s3Uploadv2(req.files);
    console.log(results);
    return res.json({ status: "success" });
  } catch (err) {
    console.log(err);
  }
});



// router.delete("/profilePicture", tokenChecker, UsersController.removeProfilePicture);

router.delete("/friends/deny", tokenChecker, UsersController.denyFriend);

module.exports = router;
