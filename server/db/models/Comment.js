"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      this.belongsTo(models.Ticket, {
        foreignKey: "ticket_id",
      });
    }
  }

  Comment.init(
    {
      user_id: DataTypes.INTEGER,
      text: DataTypes.TEXT,
      ticket_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
