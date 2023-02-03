const { GameUKR } = require("../../models/gameUKR");

const getAllUkrByUser = async (req, res) => {
  const { id: owner } = req.user;

  const result = await GameUKR.find({ owner });

  res.json(result);
};

module.exports = getAllUkrByUser;
