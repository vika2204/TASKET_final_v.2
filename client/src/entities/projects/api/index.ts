import { axiosInstance } from "@/shared/lib/axiosInstance";
import { Project,ProjectList } from "../model";



export class ProjectService {
  static async getAllProjects():Promise<ProjectList>{
    try {
      const response = await axiosInstance.get("/projects")

      
      return response.data
    } catch (error) {
      console.error("Error fetching all projects:", error);
      throw new Error("Failed to fetch projects");
    }
  }

static async createNewProject(title:string,code:string):Promise<Project>{
  try {
    const response = await axiosInstance.post("/projects",{title,code})
    return response.data.project
  } catch (error) {
    console.error("Error create project:", error);
    throw new Error("Failed to create project");
  }
}

}