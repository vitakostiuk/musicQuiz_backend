const { GameUKR, joiSchemasUKR } = require("../../models/gameUKR");
const createError = require("../../helpers/createError");

const editLevelByIdUKR = async (req, res) => {
  const { error } = joiSchemasUKR.add.validate(req.body);
  if (error) {
    throw createError(400, "Missing required name field");
  }

  const { levelId } = req.params;
  const { time } = req.body;

  const resultByDB = await GameUKR.find({ _id: levelId });

  let result;

  if (time < resultByDB[0].time) {
    result = await GameUKR.findByIdAndUpdate(levelId, req.body, {
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

module.exports = editLevelByIdUKR;
