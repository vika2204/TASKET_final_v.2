const UserService = require("../services/User.service");
const jwtConfig = require("../config/jwtConfig");
const generateTokens = require("../utils/generateTokens");

class UserController {
  static async register(req, res) {
    const { email, password, username, role } = req.body;
    if (
      !email ||
      !password ||
      !username ||
      !role ||
      email.trim() === "" ||
      password.trim() === "" ||
      username.trim() === "" ||
      role.trim() === ""
    ) {
      res
        .status(400)
        .json({ user: {}, message: "No email or password or name" });
    }
    try {
      const { user, accessToken, refreshToken } =
        await UserService.registerUser(email, password, username, role);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refresh.expiresIn,
      });
      res.status(201).json({ user, message: "success", accessToken });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async authorization(req, res) {
    const { email, password } = req.body;
    try {
      const { user, accessToken, refreshToken } =
        await UserService.authorizeUser(email, password);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refresh.expiresIn,
      });
      res.status(200).json({ user, accessToken });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  static async refresh(req, res) {
    try {
      const user = res.locals.user;
      const { accessToken, refreshToken } = await UserService.refreshTokens(
        user
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refresh.expiresIn,
      });
      res.status(200).json({ user, accessToken });
    } catch (error) {
      res.status(401).json({ user: {}, accessToken: "" });
    }
  }

  static async logout(req, res) {
    res.clearCookie("refreshToken").json({ message: "clearCookie" });
  }

  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getUsers();
      const usersWithoutPassword = users.map((user) => {
        const targetUser = user.get();
        delete targetUser.password;
        return targetUser;
      });
      res.status(200).json({ message: "Success", users: usersWithoutPassword });
    } catch (error) {
      res.status(500).json({ message: error.message, users: [] });
    }
  }

  static async updateUserController(req, res) {
    const { username, curPass, email, role, newPass } = req.body;
    const { id } = res.locals.user;

    try {
      const updateData = {};
      if (email) updateData.email = email;
      if (curPass) updateData.curPass = curPass;
      if (username) updateData.username = username;
      if (role) updateData.role = role;
      if (newPass) updateData.newPass = newPass;

      const updatedUser = await UserService.updateUser(updateData, id);

      if (!updatedUser) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      const { accessToken, refreshToken } = generateTokens({
        user: updatedUser,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refresh.expiresIn,
      });

      res
        .status(200)
        .json({ message: "Success", user: updatedUser, accessToken });
    } catch (error) {
      if (error.message === "Текущий пароль неверный") {
        return res.status(400).json({ message: "Неверный текущий пароль" });
      }
      res.status(500).json({ message: error.message, user: {} });
    }
  }
}

module.exports = UserController;
