const {Comment} = require('../db/models')
class CommentService {

  static async getAllComments(ticket_id) {
    try {
      const comments = await Comment.findAll({
        where: { ticket_id: ticket_id }
      });
      return comments;
    } catch (error) {
      throw new Error(`Error fetching comments for ticket_id: ${ticket_id}. ${error.message}`);
    }
  }

  static async getOneComment(id) {
    try {
      const comment = await Comment.findByPk(id);
      return comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }




  static async addComment(data) {

    
    try {
      const comment = await Comment.create(data);
      console.log(data);
      
      return comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }

 

  static async updateComment(data,id) {
    try {

      
      const [comment] = await Comment.update(data, { where: { id }  });

      return comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = CommentService;