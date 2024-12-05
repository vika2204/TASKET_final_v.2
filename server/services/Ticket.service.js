const {Ticket} = require('../db/models/Ticket')

class TicketService {
  static async getAllTickets(options = {}) {
    try {
      return await Ticket.findAll({ where: options });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getOneTickets(id) {
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
