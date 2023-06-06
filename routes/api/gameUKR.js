const express = require("express");

const { login } = require("../../middlewares");

const controllers = require("../../controllers/game");

const tryCatchWrapper = require("../../helpers/tryCatchWrapper");

const router = express.Router();

router.get("/", tryCatchWrapper(controllers.getAllUkr));
router.get("/:userID", login, tryCatchWrapper(controllers.getAllUkrByUser));
router.post("/", login, tryCatchWrapper(controllers.addLVLCompleteInfoUKR));
router.put("/:levelId", login, tryCatchWrapper(controllers.editLevelByIdUKR));
router.delete("/:levelId", login, tryCatchWrapper(controllers.removeByIdUKR));

module.exports = router;
