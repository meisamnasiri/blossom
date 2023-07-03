const User = require("./userModel");
const bcrypt = require("bcrypt");

async function registerUser(obj) {
  let user = new User({
    name: obj.name,
    email: obj.email,
    password: obj.password,
  });
  // Hashing the password.
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  return {
    name: user.name,
    email: user.email,
    _id: user._id,
  };
}

module.exports = {
  registerUser,
};
