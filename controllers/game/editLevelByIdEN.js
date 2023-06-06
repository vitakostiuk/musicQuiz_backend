const { Game, joiSchemas } = require("../../models/game");
const createError = require("../../helpers/createError");

const editLevelByIdEN = async (req, res) => {
  const { error } = joiSchemas.add.validate(req.body);
  if (error) {
    throw createError(400, "Missing required name field");
  }

  const { levelId } = req.params;
  const { time } = req.body;

  const resultByDB = await Game.find({ _id: levelId });

  let result;

  if (time < resultByDB[0].time) {
    result = await Game.findByIdAndUpdate(levelId, req.body, {
      new: true,
    });
  } else {
    result = resultByDB;
  }

  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = editLevelByIdEN;
