const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const validateEmail = function (email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, "Name should be at least 2 characters long."],
    maxLength: [50, "Too long for a name!"],
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: [true, "This email is already registered."],
    trim: true,
    lowercase: true,
    max: 150,
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

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, "privateKey");
  return token;
};

const User = mongoose.model("User", UserSchema);

const schema = Joi.object({
  _id: Joi.string().alter({
    post: (schema) => schema.forbidden(),
    put: (schema) => schema,
  }),
  name: Joi.string()
    .min(2)
    .max(50)
    .alter({
      post: (schema) => schema.required(),
      put: (schema) => schema,
    }),
  email: Joi.string()
    .email()
    .max(50)
    .alter({
      post: (schema) => schema.required(),
      put: (schema) => schema,
    }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .max(50)
    .alter({
      post: (schema) => schema.required(),
      put: (schema) => schema,
    }),
  repeatPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("confirmation password"),
});

function validateUser(user, requestMethod) {
  return schema.tailor(requestMethod).validate(user);
}

module.exports = { User, validateUser };
