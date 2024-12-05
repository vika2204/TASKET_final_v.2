const router = require("express").Router();
const apiAuthRouter = require("./api.auth.routes");

router.use("/auth", apiAuthRouter);

module.exports = router;
