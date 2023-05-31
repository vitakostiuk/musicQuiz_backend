const express = require("express");

const controllers = require("../../controllers/users");
const tryCatchWrapper = require("../../helpers/tryCatchWrapper");

const { login } = require("../../middlewares");

const router = express.Router();

router.post("/signup", tryCatchWrapper(controllers.signup));
router.post("/signin", tryCatchWrapper(controllers.signin));
router.get("/current", login, tryCatchWrapper(controllers.current));
router.post("/logout", login, tryCatchWrapper(controllers.logout));
router.patch("/forgot-password", tryCatchWrapper(controllers.sendPassword));
router.post("/google", tryCatchWrapper(controllers.googleLogin));

module.exports = router;
