const bcrypt = require("bcryptjs");
const randomize = require("randomatic");
const createError = require("../../helpers/createError");
const sendEmail = require("../../helpers/sendEmail");
const sendPasswordTemplate = require("../../helpers/sendPasswordTemplate");
const { User, joiSchema } = require("../../models/user");

const sendPassword = async (req, res) => {
  // console.log(req.body);
  const { error } = joiSchema.joiEmailSchema.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(400, "Email is wrong");
  }

  const newPassword = randomize("Aa0)", 8);
  const hashPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
  await user.updateOne({ password: hashPassword });

  const mail = {
    to: email,
    subject: "Forgot password on MusicQuiz",
    html: sendPasswordTemplate(newPassword),
  };

  await sendEmail(mail);

  res.status(200).json({
    message: `New password sent to ${email} email address`,
  });
};

module.exports = sendPassword;
