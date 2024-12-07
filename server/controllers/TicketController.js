const TicketService = require("../services/Ticket.service");

class TicketController {
  static async getAllTickets(req, res) {
    const { projectId } = req.params;
    const { search, assignee_id, status } = req.query;

    try {
      const tickets = await TicketService.getAllTickets(projectId, assignee_id, search, status);
      res.status(200).json(tickets);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async getOneTicketController(req, res) {
    const { id } = req.params;
    try {
      const ticket = await TicketService.getOneTicket(id);
      res.status(200).json({ ticket });
    } catch (error) {
      res.status(404).json({ message: error.message, ticket: {} });
    }
  }

  static async createTicketController(req, res) {
    const { title, description, estimate} = req.body;
    const { projectId } = req.params;

    // const authUser = //res.locals.user;
    if (
      !title ||
      title.trim() === "" ||
      !description ||
      description.trim() === "" ||
      !estimate
    ) {
      res.status(400).json({ message: "Заполните все поля" });
      return;
    }
    try {
      const ticket = await TicketService.addTicket({
        title,
        author_id: 1, //authUser.id,
        description,
        estimate,
        status: 'OPEN', //todo: сделать enum
        project_id: projectId,
      });

      res.status(200).json({ ticket });
    } catch (error) {
      res.status(404).json({ message: error.message, ticket: {} });
    }
  }

  static async updateTicketController(req, res) {
    const { title, assignee_id, description, status, estimate } = req.body;
    const { id } = req.params;
    try {
      const updateTicket = await TicketService.updateTicket(
        { title, assignee_id, description, status, estimate },
        id
      );
      if (updateTicket) {
        const ticket = await TicketService.getOneTicket(id);
        res.status(200).json({ ticket });
      } else {
        res.status(404).json({ message: "fail" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message, ticket: {} });
    }
  }
}

module.exports = TicketController;
