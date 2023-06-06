const getAllUkr = require("./getAllUkr");
const getAllEng = require("./getAllEng");
const addLVLCompleteInfoEN = require("./addLVLCompleteInfoEN");
const addLVLCompleteInfoUKR = require("./addLVLCompleteInfoUKR");
const getAllEngByUser = require("./getAllEngByUser");
const getAllUkrByUser = require("./getAllUkrByUser");
const removeByIdUKR = require("./removeByIdUKR");
const removeByIdEN = require("./removeByIdEN");
const editLevelByIdEN = require("./editLevelByIdEN");
const editLevelByIdUKR = require("./editLevelByIdUKR");

module.exports = {
  getAllUkr,
  getAllEng,
  addLVLCompleteInfoEN,
  addLVLCompleteInfoUKR,
  getAllEngByUser,
  getAllUkrByUser,
  removeByIdUKR,
  removeByIdEN,
  editLevelByIdEN,
  editLevelByIdUKR,
};
