import { Project } from "@/entities/projects";
import { getAllProjects } from "@/entities/projects/model/ProjectThunk";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { useEffect } from "react";
import {projectSlice} from "@/entities/projects/model/ProjectSlice.ts";

export const ProjectsDropDown = () => {
  const dispatch = useAppDispatch();
  const { projectList, currentProject} = useAppSelector(state => state.project);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  const handleProjectSelect = (project:Project) => {
    dispatch(
        projectSlice.actions.setSelectedProject(project)
    )
  };

  return (
    <div className="dropdown is-hoverable">
      <div className="dropdown-trigger">
        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>Проект: <strong>{currentProject.title}</strong></span>
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
              className={`dropdown-item ${currentProject.id === project.id ? 'is-active' : ''}`}
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
