import { EditButton, ResponsibleForm, StatusForm } from "@/features/ticket";
import { Ticket } from "../model";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { getAllProjects } from "@/entities/projects/model/ProjectThunk";


interface TicketItemProps {
  ticket: Ticket;
}

export const TicketItem: React.FC<TicketItemProps> = ({ ticket }) => {
  const dispatch = useAppDispatch();
  const projectList = useAppSelector(state => state.project.projectList);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);


  const project = projectList.find(project => project.id === ticket.project_id);

  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <Link to={`/tickets/${ticket.id}`}>
              <h1 className="title">{project ? project.title : "Unknown Project"}-{ticket.id} {ticket.title}</h1>
            </Link>
          </div>
        </div>

        <div className="content">
          <div className="buttons">
            <EditButton ticket={ticket} />
            <StatusForm ticket={ticket} />
            <ResponsibleForm ticket={ticket} />
          </div>

          <p>{ticket.description}</p>
          <br />
          <strong>Оценка: {ticket.estimate} ч</strong>
        </div>
      </div>
    </div>
  );
};