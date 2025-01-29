const { Router } = require("express");
const router = Router();

const auth = require("./auth/auth");
router.use("/", auth);

module.exports = router;
