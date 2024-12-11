const { Comment, User, Ticket, Project } = require("../db/models");

class CommentService {
  static async getAllComments(ticket_id) {
    try {
      const comments = await Comment.findAll({
        where: { ticket_id: ticket_id },
        include: [
            { model: User, as: "user" },
            { model: Ticket, as: "ticket", include: [
              { model: Project, as: "project" }
            ]},
        ],
      });
      return comments;
    } catch (error) {
      throw new Error(
        `Error fetching comments for ticket_id: ${ticket_id}. ${error.message}`
      );
    }
  }
  static async getAllUserComments(user_id) {
    try {
      const comments = await Comment.findAll({
        where: { user_id: user_id },
        include: [
            { model: User, as: "user" },
            { model: Ticket, as: "ticket", include: [
                { model: Project, as: "project" }
            ]},
        ],
      });
      return comments;
    } catch (error) {
      throw new Error(
        `Error fetching comments for user_id: ${user_id}. ${error.message}`
      );
    }
  }

  static async getOneComment(id) {
    try {
      const comment = await Comment.findByPk(id, {
        include: [
          { model: User, as: "user" },
          { model: Ticket, as: "ticket", include: [
              { model: Project, as: "project" }
            ]},
        ],
      });
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

  static async updateComment(data, id) {
    try {
      const [comment] = await Comment.update(data, { where: { id } });

      return comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = CommentService;
