import TicketService from "../services/Ticket.service";

class TicketController{

  static async getAllTickets(req, res) {
    const { author_id, assignee_id, status } = req.query;
    const options = {};
    if (author_id) options.author_id = author_id;
    if (assignee_id) options.assignee_id = assignee_id;
    if (status) options.status = status;
    try {
      const tickets = await TicketService.getAllTickets(options);
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOneTicketController(req, res) {
    try {
      const ticket = await TicketService.getOneTickets();
      res.status(200).json({ticket});
    } catch (error) {
      res.status(500).json({ message: error.message, ticket: {} });
    }
  }

  static async createTicketController(req, res) {
    const {title,author_id,description,status,project_id  } = req.body;
    const authUser = res.locals.user;
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      status.trim() === "" ||
      !author_id ||
      !project_id
    ) {
      res.status(400).json({ message: "Заполните все поля" });
      return;
    }
    try {
      const ticket = await TicketService.addTicket({
        title,
        author_id: authUser.id,
        description,
        status,
        project_id 
      });
      res.status(200).json({ ticket });
    } catch (error) {
      res.status(500).json({ message: error.message, ticket: {} });
    }
  }

  static async updateTicketController(req, res) {
    const {title,author_id, assignee_id, description,status,project_id} = req.body;
    const { id } = req.params;
    try {
      const updateTicket = await TicketService.updateTicket({title,author_id, assignee_id, description,status,project_id}, id);
      if (updateTicket) {
        const ticket = await TicketService.getOneTickets(id);
        res.status(200).json({ ticket });
      } else {
        res.status(200).json({ message: "fail" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message, ticket: {} });
    }
  }

}


module.exports = TicketController