const router = require("express").Router();
const apiAuthRouter = require("./api.auth.routes");
const apiTicketsRouter = require("./api.ticket.routes");
const apiCommentsRouter = require("./api.comment.routes");


router.use("/auth", apiAuthRouter);
router.use("/tickets", apiTicketsRouter)
router.use("/comments", apiCommentsRouter)
module.exports = router;
