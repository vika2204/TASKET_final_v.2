const CommentController = require("../controllers/commentController");

const router = require("express").Router();


router.get('/', CommentController.getAllComments)
router.post('/', CommentController.createCommentController)
router.put('/:id',CommentController.updateCommentController)
router.delete('/:id', CommentController.deleteCommentController)





module.exports = router;