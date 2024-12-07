import { useState } from "react";

export function StatusForm() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
  };

  const statuses = [
    "Ожидает разработки",
    "В работе",
    "На уточнении",
    "Завершено",
  ];

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
                selectedStatus === "Ожидает разработки"
                  ? "is-link"
                  : selectedStatus === "В работе"
                  ? "is-info"
                  : selectedStatus === "Завершено"
                  ? "is-success"
                  : ""
              }`}
            >
              {selectedStatus || "Выбрать"}
            </span>
          </span>
          <span className="icon is-small" style={{ color: "white" }}>
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {statuses.map((status) => (
            <a
              key={status}
              className="dropdown-item"
              onClick={() => handleStatusSelect(status)}
            >
              <span
                className={`tag is-light has-text-weight-bold is-uppercase ${
                  status === "Ожидает разработки"
                    ? "is-link"
                    : status === "В работе"
                    ? "is-info"
                    : status === "Завершено"
                    ? "is-success"
                    : ""
                }`}
              >
                {status}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
