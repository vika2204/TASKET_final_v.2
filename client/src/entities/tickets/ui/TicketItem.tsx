import { EditButton, ResponsibleForm, StatusForm } from "@/features/ticket";
import { Ticket } from "../model";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/shared/hooks/rtkHooks";
import sanitizeHtml from 'sanitize-html';

interface TicketItemProps {
  ticket: Ticket;
}

export const TicketItem: React.FC<TicketItemProps> = ({ ticket }) => {
  const project = useAppSelector(state => state.project.currentProject);

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
            <EditButton ticket={ticket}/>
            <StatusForm ticket={ticket}/>
            <ResponsibleForm ticket={ticket}/>
          </div>

          {/*<p>{ticket.description}</p>*/}
          {/*раньше использовали пропс выше, а теперь выводим сырой HTML код dangerouslySetInnerHTML*/}
          {/*sanitizeHtml имеет белый список тегов, которые безопасно выводить*/}
          {/*мы добавляем в этот метод атрибут цвет текста*/}
          <p dangerouslySetInnerHTML={{__html: sanitizeHtml(ticket.description, {
            allowedAttributes: {
              span: ['style']
            }
            })}}/>
          <br/>
          <strong>Оценка: {ticket.estimate} ч</strong>
        </div>
      </div>
    </div>
  );
};
