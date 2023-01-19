const { Schema, model } = require("mongoose");
const Joi = require("joi");

// Схема валідації для додавання LVLCompleteInfo
const addLVLCompleteInfoSchema = Joi.object({
  isRoboQuizMode: oi.boolean().required(),
  level: Joi.number().required(),
  time: Joi.number().required(),
});

const LVLCompleteInfoSchema = new Schema({
  isRoboQuizMode: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  // в owner будемо записувати id людини, яка додала
  // Schema.Types.ObjectId - особливий тип даних для id
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    // тут вказуємо, з якої колекції цей id
  },
});

const joiSchemas = {
  add: addLVLCompleteInfoSchema,
};

const Game = model("game", LVLCompleteInfoSchema);

module.exports = { Game, joiSchemas };
