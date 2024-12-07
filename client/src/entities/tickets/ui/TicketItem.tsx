import { EditButton, ResponsibleForm, StatusForm } from "@/features/ticket";
import { Ticket } from "../model";
import { Link } from "react-router-dom";


export function TicketItem({ticket}:{ticket:Ticket}) {
    return (
<>






        <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-content">
                {/* <Link to={`/tickets/${ticket.id}`}> */}
              <h1 className="title">{ticket.title}</h1>
              {/* </Link> */}
            </div>
          </div>

          <div className="content">
            <div className="buttons">
                <EditButton/>
                <StatusForm/>
                <ResponsibleForm/>
            </div>

            <p>{ticket.description}</p>
            <br />
            <strong>Оценка: {ticket.estimate} ч</strong>
          </div>
        </div>
      </div>

      </>


    )
}

