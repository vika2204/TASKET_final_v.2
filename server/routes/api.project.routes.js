const TicketController = require("../controllers/TicketController");
const verifyAccessToken = require("../middleware/verifyAccessToken");
const router = require("express").Router();

router.get("/:projectId/tickets", verifyAccessToken, TicketController.getAllTickets);
router.post(
  "/:projectId/tickets",
  verifyAccessToken,
  TicketController.createTicketController
);

module.exports = router;
