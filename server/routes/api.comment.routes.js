const CommentController = require("../controllers/CommentController");
const verifyAccessToken = require("../middleware/verifyAccessToken");

const router = require("express").Router();

router.put('/:id', verifyAccessToken, CommentController.updateCommentController)

module.exports = router;
