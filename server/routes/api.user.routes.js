const router = require("express").Router();
const CommentController = require("../controllers/CommentController");
const TicketController = require("../controllers/TicketController");
const UserController = require("../controllers/UserController");
const verifyRefreshToken = require("../middleware/verifyRefreshToken");

router.post("/registration", UserController.register);
router.post("/authorization", UserController.authorization);
router.get("/refresh", verifyRefreshToken, UserController.refresh);
router.delete("/logout", UserController.logout);
router.get("/users", verifyRefreshToken, UserController.getAllUsers);
router.put("/profile", verifyRefreshToken, UserController.updateUserController);
//метод для обновления ИМЕНИ и ПАРОЛЯ
router.get("/userId/comments", verifyRefreshToken, CommentController.getAllUserComments);
router.get("/userId/tickets", verifyRefreshToken, TicketController.getAllUserTickets);

module.exports = router;
