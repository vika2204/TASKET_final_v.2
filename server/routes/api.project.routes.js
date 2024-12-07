const TicketController = require("../controllers/TicketController");
const router = require("express").Router();

router.get('/:projectId/tickets', TicketController.getAllTickets)
router.post('/:projectId/tickets', TicketController.createTicketController)

module.exports = router;
