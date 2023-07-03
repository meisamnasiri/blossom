const mongoose = require("mongoose");

const validateEmail = function (email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: [3, "Name should be at least 3 characters long."],
    max: [50, "Too long for a name!"],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: [true, "This email is already registered."],
    trim: true,
    lowercase: true,
    max: 255,
    validate: {
      validator: validateEmail,
      message: "Invalid email address.",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
