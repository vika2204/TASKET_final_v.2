import { EditButton, ResponsibleForm, StatusForm } from "@/features/ticket";
import { Ticket } from "../model";
import { Link } from "react-router-dom";


interface  TicketItemProps {
  ticket: Ticket;
}


export const TicketItem: React.FC<TicketItemProps> = ({ ticket }) => {
    return (


        <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-content">
                <Link to={`/tickets/${ticket.id}`}>
              <h1 className="title">{ticket.title}</h1>
              </Link>
            </div>
          </div>

          <div className="content">
            <div className="buttons">
                <EditButton/>
                <StatusForm  ticket={ticket}/>
                <ResponsibleForm/>
            </div>

            <p>{ticket.description}</p>
            <br />
            <strong>Оценка: {ticket.estimate} </strong>
          </div>
        </div>
      </div>




    )
}

