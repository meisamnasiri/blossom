const User = require("./userModel");
const bcrypt = require("bcrypt");

async function findUser(filter) {
  if (!filter.id) {
    const user = await User.findOne({ email: filter.email });
    return user;
  }
  const user = await User.findById(filter.id);
  return user;
}

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

async function deleteUser(userId) {
  const result = await User.deleteOne({ _id: userId });
  return result;
}

async function updateUser(userUpdate) {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(userUpdate.password, salt);

  const result = await User.updateOne(
    { _id: userUpdate._id },
    {
      name: userUpdate.name,
      email: userUpdate.email,
      password: hashed,
    }
  );

  return result;
}

module.exports = {
  findUser,
  registerUser,
  deleteUser,
  updateUser,
};
