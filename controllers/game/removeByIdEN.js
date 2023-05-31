const { Game } = require("../../models/game");
const createError = require("../../helpers/createError");

const removeByIdEN = async (req, res, next) => {
  try {
    const { levelId } = req.params;

    const result = await Game.findByIdAndRemove(levelId);

    if (!result) {
      throw createError(404);
    }
    // повертаємо на фронтенд об'єкт з message
    res.json({ message: "Level deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeByIdEN;
