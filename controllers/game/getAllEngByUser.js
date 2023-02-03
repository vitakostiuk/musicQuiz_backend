const { Game } = require("../../models/game");

const getAllEngByUser = async (req, res) => {
  const { id: owner } = req.user;

  const result = await Game.find({ owner });

  res.json(result);
};

module.exports = getAllEngByUser;
