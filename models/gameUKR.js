const { Schema, model } = require("mongoose");
const Joi = require("joi");

// Схема валідації для додавання LVLCompleteInfo
const addLVLCompleteInfoSchemaUKR = Joi.object({
  isRoboQuizMode: Joi.boolean().required(),
  level: Joi.number().required(),
  time: Joi.number().required(),
});

const LVLCompleteInfoSchemaUKR = new Schema({
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
  user: {
    type: Object,
  },
});

const joiSchemasUKR = {
  add: addLVLCompleteInfoSchemaUKR,
};

const GameUKR = model("gameUKR", LVLCompleteInfoSchemaUKR);

module.exports = { GameUKR, joiSchemasUKR };
