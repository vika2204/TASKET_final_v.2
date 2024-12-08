const CommentService = require("../services/Comment.service");

class CommentController {
  static async getAllComments(req, res) {
    const { ticketId } = req.params;
    console.log(`Fetching comments for ticket_id: ${ticketId}`);

    if (!ticketId) {
      return res.status(400).json({ error: "ticket_id is required" });
    }

    try {
      const comments = await CommentService.getAllComments(ticketId);
      console.log(
        `Found ${comments.length} comments for ticket_id: ${ticketId}`
      );
      res.status(200).json(comments);
    } catch (error) {
      console.error(
        `Error fetching comments for ticket_id: ${ticketId}`,
        error
      );
      res.status(404).json({ error: error.message });
    }
  }

  static async createCommentController(req, res) {
    const { text } = req.body;
    const { ticketId } = req.params;
    const { user } = res.locals;

    if (!text || text.trim() === "") {
      res.status(400).json({ message: "Заполните все поля" });
      return;
    }
    try {
      const comment = await CommentService.addComment({
        user_id: user.id,
        text,
        ticket_id: ticketId,
      });
      res.status(200).json({ comment });
    } catch (error) {
      res.status(404).json({ message: error.message, comment: {} });
    }
  }

  static async updateCommentController(req, res) {
    const { text } = req.body;
    const { id } = req.params;
    try {
      const updateComment = await CommentService.updateComment({ text }, id);
      if (updateComment) {
        const comment = await CommentService.getOneComment(id);
        res.status(200).json({ comment });
      } else {
        res.status(404).json({ message: "fail" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message, comment: {} });
    }
  }

  static async deleteCommentController(req, res) {
    const { id } = req.params;
    const authUserId = res.locals.user.id;
    try {
      const deleteComment = await CommentService.deleteComment(id, authUserId);
      if (deleteComment) {
        res.status(200).json({ message: "success" });
      } else {
        res.status(404).json({ message: "Comment not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = CommentController;
