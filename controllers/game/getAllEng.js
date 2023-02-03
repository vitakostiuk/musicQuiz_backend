const { Game } = require("../../models/game");

const getAllEng = async (req, res) => {
  const result = await Game.find();

  res.json(result);
};

module.exports = getAllEng;
