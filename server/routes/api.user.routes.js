const router = require("express").Router();
const UserController = require("../controllers/UserController");
const verifyRefreshToken = require("../middleware/verifyRefreshToken");

router.post("/registration", UserController.register);
router.post("/authorization", UserController.authorization);
router.get("/refresh", verifyRefreshToken, UserController.refresh);
router.delete("/logout", UserController.logout);
router.get("/users", verifyRefreshToken, UserController.getAllUsers);
router.put("/profile", verifyRefreshToken, UserController.updateUserController);
//метод для обновления ИМЕНИ и ПАРОЛЯ

module.exports = router;
