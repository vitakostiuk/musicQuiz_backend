const express = require("express");

const { login } = require("../../middlewares");

const controllers = require("../../controllers/game");

const tryCatchWrapper = require("../../helpers/tryCatchWrapper");

const router = express.Router();

router.get("/", tryCatchWrapper(controllers.getAllEng));
router.post("/", login, tryCatchWrapper(controllers.addLVLCompleteInfoEN));

module.exports = router;
