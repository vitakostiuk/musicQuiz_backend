const { GameUKR } = require("../../models/gameUKR");
const createError = require("../../helpers/createError");

const removeByIdUKR = async (req, res, next) => {
  try {
    const { levelId } = req.params;

    const result = await GameUKR.findByIdAndRemove(levelId);

    if (!result) {
      throw createError(404);
    }
    // повертаємо на фронтенд об'єкт з message
    res.json({ message: "Level deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeByIdUKR;
