const {Comment} = require('../db/models/Comment')
class CommentService {
  static async getAllComments(options = {}) {
    const comments = await Comment.findAll({ where: options });
    try {
      return comments;
    } catch (error) {
      throw new Error(error.message);
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
      return comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteComment(id, authUserId) {
    try {
      const comment = await Comment.destroy({ where: { id, user_id: authUserId } });
      return comment
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