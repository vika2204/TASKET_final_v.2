"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Ticket, {
        through: "Comment",
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      email: DataTypes.TEXT,
      password: DataTypes.INTEGER,
      username: DataTypes.TEXT,
      role: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
