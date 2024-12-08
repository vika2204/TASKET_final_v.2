const TicketController = require("../controllers/TicketController");
const CommentController = require("../controllers/CommentController");
const verifyAccessToken = require("../middleware/verifyAccessToken");
const router = require("express").Router();


router.get('/:id', verifyAccessToken, TicketController.getOneTicketController)
router.put('/:id', verifyAccessToken, TicketController.updateTicketController)
router.get('/:ticketId/comments', verifyAccessToken, CommentController.getAllComments)
router.post('/:ticketId/comments', verifyAccessToken, CommentController.createCommentController)
router.post('/:ticketId/analysis', verifyAccessToken, TicketController.ticketAnalysisController)


module.exports = router;
