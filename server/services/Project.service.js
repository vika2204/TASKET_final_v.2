const { Project } = require("../db/models");

class ProjectService {
  static async getAllProjects() {
    try {
      return await Project.findAll();
    } catch (error) {
      throw new Error(`Error fetching projects: ${error.message}`);
    }
  }

  static async createNewProject(data) {
    try {
      return await Project.create(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = ProjectService