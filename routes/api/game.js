const express = require("express");

const { login } = require("../../middlewares");

const controllers = require("../../controllers/game");

const tryCatchWrapper = require("../../helpers/tryCatchWrapper");

const router = express.Router();

router.get("/", tryCatchWrapper(controllers.getAllEng));
router.get("/:userID", login, tryCatchWrapper(controllers.getAllEngByUser));
router.post("/", login, tryCatchWrapper(controllers.addLVLCompleteInfoEN));
router.put("/:levelId", login, tryCatchWrapper(controllers.editLevelByIdEN));
router.delete("/:levelId", login, tryCatchWrapper(controllers.removeByIdEN));

module.exports = router;
