const { Op } = require("sequelize");
const TicketService = require("../services/Ticket.service");

class TicketController {
  static async getAllTickets(req, res) {
    const { search, assignee_id, status } = req.query;
    const options = {};

    if (assignee_id) options.assignee_id = assignee_id;
    if (status) options.status = status;

    if (search) {
      options[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    try {
      const tickets = await TicketService.getAllTickets(options);
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOneTicketController(req, res) {
    const { id } = req.params;
    try {
      const ticket = await TicketService.getOneTickets(id);
      res.status(200).json({ ticket });
    } catch (error) {
      res.status(500).json({ message: error.message, ticket: {} });
    }
  }

  static async createTicketController(req, res) {
    const { title, author_id, description, status, estimate, project_id } =
      req.body;

    // const authUser = //res.locals.user;
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      status.trim() === "" ||
      !estimate ||
      // !author_id ||
      //!estimate||
      !project_id
    ) {
      res.status(400).json({ message: "Заполните все поля" });
      return;
    }
    try {
      const ticket = await TicketService.addTicket({
        title,
        author_id: 1, //authUser.id,
        description,
        estimate: 1,
        status,
        project_id,
      });

      res.status(200).json({ ticket });
    } catch (error) {
      res.status(500).json({ message: error.message, ticket: {} });
    }
  }

  static async updateTicketController(req, res) {
    const { title, assignee_id, description, status, estimate } =
      req.body;
    const { id } = req.params;
    try {
      const updateTicket = await TicketService.updateTicket(
        { title, assignee_id, description, status, estimate },
        id
      );
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

module.exports = TicketController;
