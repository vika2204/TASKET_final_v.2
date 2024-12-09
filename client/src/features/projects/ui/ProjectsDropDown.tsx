import { Project } from "@/entities/projects";
import { getAllProjects } from "@/entities/projects/model/ProjectThunk";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { useEffect, useState } from "react";

export const ProjectsDropDown = () => {
  const dispatch = useAppDispatch();
  const { projectList } = useAppSelector(state => state.project);
  const [selectedProject, setSelectedProject] = useState<Project>();

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  useEffect(() => {

    if (projectList.length > 0) {
      setSelectedProject(projectList[0]);
    }
  }, [projectList]);

  const handleProjectSelect = (project:Project) => {
    setSelectedProject(project);
  };

  return (
    <div className="dropdown is-hoverable">
      <div className="dropdown-trigger">
        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>Проект: <strong>{selectedProject ? selectedProject.title : "ELBRUS"}</strong></span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {projectList.map(project => (
            <a
              key={project.id}
              className={`dropdown-item ${selectedProject && selectedProject.id === project.id ? 'is-active' : ''}`}
              onClick={() => handleProjectSelect(project)}
            >
              {project.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};