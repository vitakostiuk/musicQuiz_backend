const { User, joiSchema } = require("../../models/user");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const googleLogin = async (req, res) => {
  const { name, email, avatarURL } = req.body;
  // console.log(req.body);

  const user = await User.findOne({ email });
  // console.log(user);

  if (user) {
    await user.updateOne({ avatarURL });

    res.status(201).json({
      token: user.token,
      user: {
        email: user.email,
        avatarURL: user.avatarURL,
      },
    });
  }

  if (!user) {
    const result = await User.create(req.body);

    // create token
    const payload = {
      id: result._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

    // -2- update user in database
    await User.findByIdAndUpdate(result._id, {
      ...req.body,
      name,
      email,
      password: "",
      token,
      avatarURL,
    });

    res.status(201).json({
      token,
      user: {
        email: result.email,
        avatarURL: result.avatarURL,
      },
    });
  }
};

module.exports = googleLogin;
