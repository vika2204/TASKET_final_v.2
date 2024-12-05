const CommentService = require("../services/Comment.service");

class CommentController{

  static async getAllComments(req, res) {
    const { ticket_id } = req.query;
    const options = {};
    if (ticket_id) options.ticket_id = ticket_id;
   
    try {
      const comments = await CommentService.getAllComments(options);
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

 
  static async createCommentController(req, res) {
    const {user_id,text,ticket_id} = req.body;
    const authUser = res.locals.user;
    if (
      text.trim() === "" ||
      !user_id ||
      !ticket_id
    ) {
      res.status(400).json({ message: "Заполните все поля" });
      return;
    }
    try {
      const comment = await CommentService.addComment({
        user_id:authUser.id,
        text,
        ticket_id,
      });
      res.status(200).json({ comment });
    } catch (error) {
      res.status(500).json({ message: error.message, comment: {} });
    }
  }

  static async updateCommentController(req, res) {
    const {text} = req.body;
    const { id } = req.params;
    try {
      const updateComment = await CommentService.updateComment({text}, id);
      if (updateComment) {
        const comment = await CommentService.getOneComment(id);
        res.status(200).json({ comment });
      } else {
        res.status(200).json({ message: "fail" });
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
        res.status(400).json({ message: "Что-то пошло не так" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }




  
}


module.exports = CommentController