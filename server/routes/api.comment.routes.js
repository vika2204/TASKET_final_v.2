const CommentController = require("../controllers/CommentController");

const router = require("express").Router();


router.get('/:ticket_id', CommentController.getAllComments)
router.post('/', CommentController.createCommentController)
router.put('/:id',CommentController.updateCommentController)





module.exports = router;