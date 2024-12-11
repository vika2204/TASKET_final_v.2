const ProjectService = require("../services/Project.service");

class ProjectController {
  static async getAllProjects(req, res) {
    try {
      const projects = await ProjectService.getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async createNewProject(req, res) {
    const user = res.locals.user;
    const { title, user_id, code } = req.body;

    if (!title || !code || title.trim() === "" || code.trim() === "") {
      res.status(400).json({ message: "Заполните все поля" });
      return;
    }
    try {
      const project = await ProjectService.createNewProject({
        title,
        user_id: user.id,
        code,
      });

      res.status(200).json({ project });
    } catch (error) {
      res.status(404).json({ message: error.message, project: {} });
    }
  }
}

module.exports = ProjectController;
