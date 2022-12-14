const bcrypt = require("bcryptjs");
const { User, joiSchema } = require("../../models/user");
const createError = require("../../helpers/createError");

const login = async (req, res) => {
  const { error } = joiSchema.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "Email or password is wrong");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw createError(401, "Email or password is wrong");
  }

  res.status(201).json({
    token: user.token,
    user: {
      email: user.email,
    },
  });
};

module.exports = login;
