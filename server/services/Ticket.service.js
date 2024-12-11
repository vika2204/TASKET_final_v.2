const {Ticket, Project} = require('../db/models')
const {Op} = require("sequelize");
const {sequelize} = require("../db/models/index.js")

class TicketService {

  static async getAllTickets(projectId, assignee_id = null, search = null, statuses = null) {

    try {
      const options = {
        project_id: projectId
      };

      if (assignee_id) options.assignee_id = assignee_id;
      if (statuses) {
        options.status = { [Op.in]: statuses };
      }
      if (search) {
        options[Op.or] = [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
          sequelize.where(
              sequelize.cast(sequelize.col("Ticket.id"),"varchar"),
              { [Op.iLike]:  `%${search}%` }
      )
        ];
      }

   return await Ticket.findAll({
     where: options,
     order: [['createdAt', 'DESC']],
     include: [{ model: Project, as: "project" }]
   });

    } catch (error) {
      throw new Error(error.message);
    }
  }


  static async getAllUserTickets(author_id) {
    try {
      const tickets = await Ticket.findAll({
        where: {author_id},
        include: [{ model: Project, as: "project" }]
      });
      console.log(tickets);

      return tickets;
    } catch (error) {
      throw new Error(
        `Error fetching comments for user_id: ${author_id}. ${error.message}`
      );
    }
  }


  static async getOneTicket(id) {
    try {
      const ticket = await Ticket.findByPk(id, {
        include: [{ model: Project, as: "project" }]
      });
      return ticket;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addTicket(data) {
    try {
      const ticket = await Ticket.create(data);
      return ticket;
    } catch (error) {
      throw new Error(error.message);
    }
  }


  static async updateTicket(data, id) {
    try {
      const [ticket] = await Ticket.update(data, {where:{id}});
      return ticket;
    } catch (error) {
      throw new Error(error.message);
    }
  }






}

module.exports = TicketService;
