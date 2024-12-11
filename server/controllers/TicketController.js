const TicketService = require("../services/Ticket.service");
const {TICKET_STATUS, validateStatus} = require("../types/ticketStatusType");
const AIService = require("../services/AI.service")

class TicketController {
  static async getAllTickets(req, res) {
    const { projectId } = req.params;
    const { search, assignee_id, status } = req.query;

    if(Array.isArray(status)){
      for(let el of status) {
        if (el !== undefined && !validateStatus(el)) {
          res.status(400).json({ error: 'Incorrect status' });
          return;
        }
      }
    }

    try {
      const tickets = await TicketService.getAllTickets(
        projectId,
        assignee_id,
        search,
        status
      );

      res.status(200).json(tickets);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async getAllUserTickets(req, res) {
    const  author_id  = res.locals.user.id;

    if (!author_id) {
      return res.status(400).json({ error: "author_id is required" });
    }

    try {
      const tickets = await TicketService.getAllUserTickets(author_id);
      console.log(tickets);

      console.log(
        `Found ${tickets.length} tickets for author_id: ${author_id}`
      );
      res.status(200).json(tickets);
    } catch (error) {
      console.error(
        `Error fetching tickets for author_id: ${author_id}`,
        error
      );
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
    const { title, description, estimate } = req.body;
    const { projectId } = req.params;

    const authUser = res.locals.user

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
        author_id: authUser.id,
        description,
        estimate,
        status: TICKET_STATUS.OPEN,
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

    if (
        !title ||
        title.trim() === "" ||
        !description ||
        description.trim() === "" ||
        !estimate ||
        !validateStatus(status)
    ) {
      res.status(400).json({ message: "Заполните все поля" });
      return;
    }

    try {
      const updateTicket = await TicketService.updateTicket(
        { title, assignee_id, description, status, estimate },
        id
      );
      if (updateTicket) {
        const ticket = await TicketService.getOneTicket(id);
        console.log(ticket);

        res.status(200).json({ ticket });
      } else {
        res.status(404).json({ message: "fail" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message, ticket: {} });
    }
  }

  static async ticketAnalysisController (req, res) {
    try {
      const {ticketId} = req.params;
      const ticket = await TicketService.getOneTicket(ticketId);
      if(ticket === undefined){
        res.status(404).json({ message: `ticket is not found`});
        return;
      }
      const response = await AIService.askGPT(ticket);
      res.status(200).json(response);

    } catch (error) {
      res.status(500).json({ message: error.message, ticket: {} })
    }

  }

}

module.exports = TicketController;
