const express = require("express");

const controllers = require("../../controllers/users");
const tryCatchWrapper = require("../../helpers/tryCatchWrapper");

const { login } = require("../../middlewares");

const router = express.Router();

router.post("/signup", tryCatchWrapper(controllers.signup));
router.post("/signin", tryCatchWrapper(controllers.signin));
router.get("/current", login, tryCatchWrapper(controllers.current));
router.get("/logout", login, tryCatchWrapper(controllers.logout));

module.exports = router;
