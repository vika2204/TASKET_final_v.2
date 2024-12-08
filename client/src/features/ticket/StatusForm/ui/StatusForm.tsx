import { useState } from "react";
import {
  getTicketStatusClass,
  getTicketStatusEnumFromString,
  getTicketStatusName,
  TICKET_STATUS
} from "@/shared/types/statusEnum.ts";

export function StatusForm() {
  const [selectedStatus, setSelectedStatus] = useState<TICKET_STATUS | null>(null);

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(getTicketStatusEnumFromString(status));
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
              className={`tag has-text-weight-bold is-uppercase ${
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
              onClick={() => handleStatusSelect(status)}
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
