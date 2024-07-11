const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  forename: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true },
  profilePicture: { type: String, default: ""},
  gender: {
    type: String,
    enum: ["Male", "Female", "Non-binary", "Prefer not to say"],
    default: "Prefer not to say",
  },
  location: {
    type: String,
    default: "",
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
