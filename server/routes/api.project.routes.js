const ProjectController = require("../controllers/ProjectController");
const TicketController = require("../controllers/TicketController");
const verifyAccessToken = require("../middleware/verifyAccessToken");
const router = require("express").Router();




router.get("/",ProjectController.getAllProjects)
router.post("/",ProjectController.createNewProject)
router.get("/:projectId/tickets", TicketController.getAllTickets);
router.post(
  "/:projectId/tickets",
  verifyAccessToken,
  TicketController.createTicketController
);

module.exports = router;
