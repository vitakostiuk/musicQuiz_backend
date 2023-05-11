const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const joiRegisterSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const joiSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const joiEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
      // unique - поле унікальне. Але,щоб це спрацювало, треба в базі
      // у вкладці indexes створити унікальний індекс по цьому полю, тоді воно стане унікальним
    },
    password: {
      type: String,
      // minlength: 6,
      // required: [true, "Password is required"],
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = {
  joiRegisterSchema,
  joiSigninSchema,
  joiEmailSchema,
};

const User = model("user", userSchema);

module.exports = { User, joiSchema };
