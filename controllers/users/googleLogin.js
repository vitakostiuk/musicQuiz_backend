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
    // create token
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

    if (!user.token) {
      await user.updateOne({ token });
    }

    const result = await User.findOne({ email });

    res.status(201).json({
      token: result.token,
      user: {
        email: user.email,
        avatarURL: user.avatarURL,
        id: user._id,
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
        id: result._id,
      },
    });
  }
};

module.exports = googleLogin;
