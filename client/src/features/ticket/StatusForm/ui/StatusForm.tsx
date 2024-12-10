import { useState } from "react";
import {
  getTicketStatusClass,
  getTicketStatusName,
  TICKET_STATUS
} from "@/shared/types/statusEnum.ts";
import { useAppDispatch } from "@/shared/hooks/rtkHooks";
import { updateTicket } from "@/entities/tickets/model/TicketThunks";
import { Ticket } from "@/entities/tickets/model";

interface statusFormProps  {
  ticket: Ticket;
}


export const StatusForm: React.FC<statusFormProps> = ({ticket}) => {
  const [selectedStatus, setSelectedStatus] = useState<TICKET_STATUS | null>(ticket.status);

  const handleStatusSelect = (status: TICKET_STATUS) => {
  setSelectedStatus(status);
  updateStatusHandler(status)
  };

const dispatch = useAppDispatch()

const updateStatusHandler = (status:TICKET_STATUS|null) => {
  if (status) {
    dispatch(updateTicket({
      id: ticket.id,
      title: ticket.title,
      assignee_id: ticket.assignee_id,
      description: ticket.description,
      status: status,
      estimate: ticket.estimate
    }));
  }
};



  return (
    <div className="dropdown is-hoverable">
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>
            Статус:&nbsp;
            <span
              className={`tag has-text-weight-bold is-light is-uppercase ${
                getTicketStatusClass(selectedStatus)
              }`}
            >
              {getTicketStatusName(selectedStatus) || "Выбрать"}
            </span>
          </span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {Object.keys(TICKET_STATUS).map((status) => (
            <a
              key={status}
              className="dropdown-item"
              onClick={() => handleStatusSelect(status as TICKET_STATUS)}
            >
              <span
                className={`tag is-light has-text-weight-bold is-uppercase ${getTicketStatusClass(status)}`}
              >
                {getTicketStatusName(status)}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
