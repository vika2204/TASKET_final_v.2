import { ProjectList, ProjectService } from "@/entities/projects";
import { TicketService } from "@/entities/tickets/api";
import { TicketList } from "@/entities/tickets/model";
import { useAppSelector } from "@/shared/hooks/rtkHooks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ActiveUserTasks = () => {
  const { user } = useAppSelector((state) => state.user);

  const [projectList, setProjectList] = useState<ProjectList | undefined>();
  const [ticketList, setTicketList] = useState<TicketList | undefined>();

  const getAllProjects = async () => {
    const response = await ProjectService.getAllProjects();
    setProjectList(response);
  };

  const getAllTickets = async () => {
    const response = await TicketService.getAllUserTickets();
    setTicketList(response);
  };

  useEffect(() => {
    getAllProjects();
    getAllTickets();
  }, []);

  // Фильтруем и сортируем тикеты пользователя
  const userTickets = ticketList
    ?.filter((ticket) => ticket.author_id === user?.id) // Фильтруем по author_id
    .sort((a, b) => b.id - a.id) // Сортируем по убыванию id
    .slice(0, 5); // Берем только 5 последних

  return (
    <div className="column is-half">
      <h5 className="title">Ваши задачи</h5>
      {userTickets ? (
        userTickets.length > 0 ? (
          userTickets.map((ticket) => {
            // Находим проект по project_id у текущего тикета
            const project = projectList?.find(
              (project) => project.id === ticket.project_id
            );

            return (
              <div className="box" key={ticket.id}>
                <div className="level">
                  <div className="level-left">
                    <a>
                      <Link to={`/tickets/${ticket.id}`}>
                      <strong>
                        {project ? `${project.code}-${ticket.id}` : `UNKNOWN-${ticket.id}`}{" "}
                        {ticket.title}
                      </strong>
                      </Link>
                    </a>
                  </div>
                  <div className="level-right">
                    <span
                      className={`tag is-light has-text-weight-bold is-uppercase ${
                        ticket.status === "DONE"
                          ? "is-success"
                          : ticket.status === "IN_PROGRESS"
                          ? "is-info"
                          : ticket.status === "CANCELED"
                          ? "is-danger"
                          : "is-link"
                      }`}
                    >
                      {ticket.status === "DONE"
                        ? "Завершённые"
                        : ticket.status === "IN_PROGRESS"
                        ? "В работе"
                        : ticket.status === "CANCELED"
                        ? "Отменённые"
                        : "Ожидает разработки"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>У вас нет активных задач.</p>
        )
      ) : (
        <p>Загрузка задач...</p>
      )}
    </div>
  );
};