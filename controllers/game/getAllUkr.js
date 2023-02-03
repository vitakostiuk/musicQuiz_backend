const { GameUKR } = require("../../models/gameUKR");

const getAllUkr = async (req, res) => {
  const result = await GameUKR.find();

  res.json(result);
};

module.exports = getAllUkr;
