const TicketController = require("../controllers/ticketController");
const router = require("express").Router();


router.get('/', TicketController.getAllTickets)
router.get('/:id', TicketController.getOneTicketController)
router.post('/', TicketController.createTicketController)
router.put('/:id', TicketController.updateTicketController)


module.exports = router;