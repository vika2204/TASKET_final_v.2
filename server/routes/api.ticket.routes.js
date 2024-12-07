const TicketController = require("../controllers/TicketController");
const CommentController = require("../controllers/CommentController");
const router = require("express").Router();


router.get('/:id', TicketController.getOneTicketController)
router.put('/:id', TicketController.updateTicketController)
router.get('/:ticketId/comments', CommentController.getAllComments)
router.post('/:ticketId/comments', CommentController.createCommentController)


module.exports = router;
