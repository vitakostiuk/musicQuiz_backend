const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, joiSchema } = require("../../models/user");
const createError = require("../../helpers/createError");

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { error } = joiSchema.joiRegisterSchema.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, `${email} in use`);
  }

  // if (!user) in database
  // -1- create user in database
  const result = await User.create(req.body);
  // console.log("result", result);

  // hash password
  const hashPassword = await bcrypt.hash(password, 10);

  // create token
  const payload = {
    id: result._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  // -2- update user in database
  await User.findByIdAndUpdate(result._id, {
    ...req.body,
    password: hashPassword,
    token,
    avatarURL: "",
  });

  const finalUser = await User.findOne({ token });

  res.status(201).json({
    token,
    user: {
      email: result.email,
      id: result._id,
      avatarURL: finalUser.avatarURL,
    },
  });
};

module.exports = signup;
