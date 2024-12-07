const router = require("express").Router();
const apiUserRouter = require("./api.user.routes");
const apiProjectRouter = require("./api.project.routes");
const apiTicketsRouter = require("./api.ticket.routes");
const apiCommentsRouter = require("./api.comment.routes");


router.use("/auth", apiUserRouter);
router.use("/tickets", apiTicketsRouter)
router.use("/projects", apiProjectRouter)
router.use("/comments", apiCommentsRouter)

module.exports = router;
