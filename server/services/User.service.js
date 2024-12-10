const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../db/models");
const generateTokens = require("../utils/generateTokens");

class UserService {
  static async registerUser(email, password, username, role) {
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("This email already in use");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        password: hashedPassword,
        username,
        role,
      });

      const targetUser = newUser.get();
      delete targetUser.password;

      const { accessToken, refreshToken } = generateTokens({
        user: targetUser,
      });
      return { user: targetUser, accessToken, refreshToken };
    } catch (error) {
      throw new Error(`Error during registration: ${error.message}`);
    }
  }

  static async authorizeUser(email, password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("No user with this email");
      }

      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (!isCorrectPassword) {
        throw new Error("Incorrect password");
      }

      const targetUser = user.get();
      delete targetUser.password;

      const { accessToken, refreshToken } = generateTokens({
        user: targetUser,
      });
      return { user: targetUser, accessToken, refreshToken };
    } catch (error) {
      throw new Error(`Error during authorization: ${error.message}`);
    }
  }

  static async refreshTokens(user) {
    try {
      const { accessToken, refreshToken } = generateTokens({ user });
      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(`Error during token refresh: ${error.message}`);
    }
  }

  static async getUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateUser(updateData, id) {
    try {
      const user = await User.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        throw new Error("Пользователь не найден");
      }

      // Проверка текущего пароля, если передан новый пароль
      if (updateData.newPass && !updateData.curPass) {
        throw new Error("Текущий пароль не указан");
      }

      if (updateData.curPass) {
        const isPasswordValid = await bcrypt.compare(updateData.curPass, user.password);
        if (!isPasswordValid) {
          throw new Error("Текущий пароль неверный");
        }
      }

      // Хеширование нового пароля, если он передан
      if (updateData.newPass) {
        const newHashedPass = await bcrypt.hash(updateData.newPass, 10);
        updateData.password = newHashedPass;
      }

      // Удаляем поля, которые не нужно обновлять
      delete updateData.curPass;
      delete updateData.newPass;

      const [countUpdated] = await User.update(updateData, { where: { id } });

      if (countUpdated === 0) {
        throw new Error("Пользователь не был обновлен");
      }

      // Возвращаем обновленного пользователя
      const updatedUser = await User.findOne({ where: { id } });
      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getOneUser(id) {
    try {
      const user = await User.findOne({
        where: {
          id,
        },
      });

      const userWithoutPassword = user.get();
      delete userWithoutPassword.password;

      return userWithoutPassword;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserService;
