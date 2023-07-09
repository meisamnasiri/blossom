const User = require("./userModel");
const bcrypt = require("bcrypt");

async function findUser(filter) {
  if (!filter._id) {
    const user = await User.findOne({ email: filter.email });
    return user;
  }
  const user = await User.findById(filter._id);
  return user;
}

async function registerUser(info) {
  let user = new User({
    name: info.name,
    email: info.email,
  });

  // Hashing the password.
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(info.password, salt);
  user.password = hashed;

  return await user.save();
}

async function deleteUser(userId) {
  const result = await User.deleteOne({ _id: userId });
  return result;
}

async function updateUser(userUpdate) {
  let hashed;
  if (userUpdate.password) {
    const salt = await bcrypt.genSalt(10);
    hashed = await bcrypt.hash(userUpdate.password, salt);
  } else {
    hashed = undefined;
  }

  const user = await User.findOneAndUpdate(
    { _id: userUpdate._id },
    {
      name: userUpdate.name,
      email: userUpdate.email,
      password: hashed,
    },
    {
      new: true,
    }
  );

  return user;
}

module.exports = {
  findUser,
  registerUser,
  deleteUser,
  updateUser,
};
