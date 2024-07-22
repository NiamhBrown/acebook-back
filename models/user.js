const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  forename: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true},
  email: { type: String, required: true, unique: true },
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

const capitalize = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

UserSchema.pre("save", async function (next) {
  // Capitalize names
  if (this.isModified("forename")) {
    this.forename = capitalize(this.forename);
  }
  if (this.isModified("surname")) {
    this.surname = capitalize(this.surname);
  }

  // Hash password if it's modified
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.model("User", UserSchema);

module.exports = User;
