const CommentController = require("../controllers/CommentController");

const router = require("express").Router();

router.put('/:id',CommentController.updateCommentController)

module.exports = router;
