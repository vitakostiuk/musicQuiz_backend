const { Game } = require("../../models/game");

const getAll = async (req, res) => {
  const result = await Game.find();

  res.json(result);
};

module.exports = getAll;
