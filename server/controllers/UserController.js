const AuthService = require("../services/Auth.service");
const jwtConfig = require("../config/jwtConfig");

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
        await AuthService.registerUser(email, password, username, role);
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
        await AuthService.authorizeUser(email, password);
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
      const { accessToken, refreshToken } = await AuthService.refreshTokens(
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
      const users = await AuthService.getUsers();
      res.status(200).json({ message: "Success", users });
    } catch (error) {
      res.status(500).json({ message: error.message, users: [] });
    }
  }
}

module.exports = UserController;
