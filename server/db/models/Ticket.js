'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
   
    static associate(models) {
      this.belongsTo(models.User,{
        foreignKey: "author_id"
      }),
      this.belongsTo(models.User,{
        foreignKey: "assignee_id"
      })
      this.belongsToMany(models.User,{
        through:"Comment",
        foreignKey:"ticket_id",
      })



    }
  }
  Ticket.init({
    title: DataTypes.STRING,
    author_id: DataTypes.INTEGER,
    assignee_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    estimate:DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};