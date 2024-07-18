const User = require("../models/user");
const { generateToken } = require("../lib/token");
const { s3Uploadv2 } = require("./s3Service");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ users: users, token: token });
};

const getOneUser = async (req, res) => {
  const user = await User.find({ _id: req.user_id });
  const token = generateToken(req.user_id);
  res.status(200).json({ user: user, token: token });
};

const create = (req, res) => {
  const forename = req.body.forename;
  const surname = req.body.surname;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({ forename, surname, username, email, password });
  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Something went wrong" });
    });
};

const addFriend = async (req, res) => {
  try {
    const userId = req.user_id;
    console.log("this is the userid?", userId);
    const friendId = req.body.friendUserId;
    //console.log("this is the friendid?", friendId);
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    // console.log("this is the user", user);
    // console.log("does the user exist?", user.friends.includes(friendId));
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "You are already friends!" });
    }

    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      await user.save();
      //friend.friends.push(userId)
      //await friend.save();
    }
    const newToken = generateToken(req.user_id);
    console.log(`users line 55 ${newToken}`);
    res.status(200).json({ message: "Friend Added", token: newToken });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeFriend = async (req, res) => {
  try {
    const userId = req.user_id;
    const friendId = req.body.friendUserId;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    const friendIndex = user.friends.indexOf(friendId);
    const userIndex = friend.friends.indexOf(userId);

    if (friendIndex === -1) {
      return res.status(400).json({ message: "You are not friends anyway" });
    }
    if (user.friends.includes(friendId)) {
      user.friends.splice(friendIndex, 1);
      await user.save();
      friend.friends.splice(userIndex, 1);
      await friend.save();
    }
    const newToken = generateToken(req.user_id);
    console.log(`line 79 users ${newToken}`);
    res.status(200).json({ message: "Friend removed", token: newToken });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//working original
// const addProfilePicture = async (req, res) => {
//   try {
//     const results = await s3Uploadv2(req.files);
//     console.log(results);
//     return res.json({ status: "success" });
//   } catch (err) {
//     console.log(err);
//   }
// };

//to store filename in mongo too
const addProfilePicture = async (req, res) => {
  try {
    const files = req.files;

    // Upload to AWS S3
    const s3Response = await s3Uploadv2(files);
    console.log("S3 Upload Response:", s3Response);

    // Update user document in MongoDB
    const userId = req.user_id; // user ID is added to req from authentication middleware
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Store S3 key in user profilePicture field
    user.profilePicture = s3Response[0].key;
    user = await user.save();

    return res.json({ status: "success" });
  } catch (err) {
    console.error("Error adding profile picture:", err);
    return res.status(500).json({ error: "Failed to add profile picture" });
  }
};

const denyFriend = async (req, res) => {
  try {
    const userId = req.user_id;
    const friendId = req.body.friendUserId;
    const friend = await User.findById(friendId);
    const userIndex = friend.friends.indexOf(userId);
    if (userIndex === -1) {
      return res.status(400).json({ message: "You are not friends anyway" });
    }
    if (friend.friends.includes(userId)) {
      friend.friends.splice(userIndex, 1);
      await friend.save();
    }
    const newToken = generateToken(req.user_id);
    res.status(200).json({ message: "Friend removed", token: newToken });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user_id; //user ID has been made available in the request object from tokenChecker middleware
    const updateData = req.body.updatedUser;
    console.log("!!!!!!!! FROM THE CONTROLLER, updateData:", updateData);

    // Find user by ID and update
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    console.log("_________this is backen user:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const UsersController = {
  create: create,
  getAllUsers: getAllUsers,
  getOneUser: getOneUser,
  addFriend: addFriend,
  removeFriend: removeFriend,
  addProfilePicture: addProfilePicture,
  denyFriend: denyFriend,
  updateUser: updateUser,
};

module.exports = UsersController;
