const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, joiSchema } = require("../../models/user");
const createError = require("../../helpers/createError");

const { SECRET_KEY } = process.env;

const signin = async (req, res) => {
  const { error } = joiSchema.joiSigninSchema.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log("user", user);
  if (!user) {
    throw createError(401, "Email or password is wrong");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw createError(401, "Email or password is wrong");
  }

  // Create token
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    token,
    user: {
      email: user.email,
      id: user._id,
    },
  });
};

module.exports = signin;
