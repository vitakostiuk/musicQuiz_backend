const express = require("express");

const controllers = require("../../controllers/users");
const tryCatchWrapper = require("../../helpers/tryCatchWrapper");

const router = express.Router();

router.post("/signup", tryCatchWrapper(controllers.signup));

module.exports = router;
