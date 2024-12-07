const {Ticket} = require('../db/models')
const {Op} = require("sequelize");

class TicketService {

  static async getAllTickets(projectId, assignee_id = null, status = null, search = null) {
    console.log( status = null, search = null);
    
    try {
      const where = {
        project_id: projectId
      };

      if (assignee_id) {
        where.assignee_id = assignee_id;
      }

      if (status) {
        where.status = status;
      }

      if (search) {
        where[Op.or] = [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
        ];
      }
console.log(where);

      return await Ticket.findAll({ where });

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
