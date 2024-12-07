const {Ticket} = require('../db/models')
const {Op} = require("sequelize");

class TicketService {

  static async getAllTickets(projectId, assignee_id = null, search = null, status = null) {

    try {
      const options = {
        project_id: projectId
      };

      if (assignee_id) options.assignee_id = assignee_id;
      if (status) options.status = status;

      if (search) {
        options[Op.or] = [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
        ];
      }

   return await Ticket.findAll({ where: options, order: [['createdAt', 'DESC']]});

    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getOneTicket(id) {
    try {
      const ticket = await Ticket.findByPk(id);
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
