const { Game, joiSchemas } = require("../../models/game");
const createError = require("../../helpers/createError");

const addLVLCompleteInfoEN = async (req, res) => {
  console.log(req.body);
  const { error } = joiSchemas.add.validate(req.body);
  if (error) {
    throw createError(400, "Missing required name field");
  }

  const { id: owner } = req.user;
  console.log(req.user);

  const result = await Game.create({ ...req.body, owner, user: req.user });

  res.status(201).json(result);
};

module.exports = addLVLCompleteInfoEN;
