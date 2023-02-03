const { GameUKR, joiSchemasUKR } = require("../../models/gameUKR");
const createError = require("../../helpers/createError");

const addLVLCompleteInfoUKR = async (req, res) => {
  console.log(req.body);
  const { error } = joiSchemasUKR.add.validate(req.body);
  if (error) {
    throw createError(400, "Missing required name field");
  }

  const { id: owner } = req.user;
  console.log(req.user);

  const result = await GameUKR.create({ ...req.body, owner, user: req.user });

  res.status(201).json(result);
};

module.exports = addLVLCompleteInfoUKR;
