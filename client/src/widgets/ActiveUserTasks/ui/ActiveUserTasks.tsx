import { useAppSelector } from "@/shared/hooks/rtkHooks";

export const ActiveUserTasks = () => {
  const { user } = useAppSelector((state) => state.user);
  const { ticketList } = useAppSelector((state) => state.ticket);
  const { projectList } = useAppSelector((state) => state.project);

  // Фильтруем и сортируем тикеты пользователя
  const userTickets = ticketList
    .filter((ticket) => ticket.author_id === user?.id) // Фильтруем по author_id
    .sort((a, b) => b.id - a.id) // Сортируем по убыванию id
    .slice(0, 5); // Берем только 5 последних
console.log(ticketList);

  return (
    <div className="column is-half">
      <h5 className="title">Ваши задачи</h5>
      {userTickets.length > 0 ? (
        userTickets.map((ticket) => {
          // Находим проект по project_id у текущего тикета
          const project = projectList.find(
            (project) => project.id === ticket.project_id
          );

          return (
            <div className="box" key={ticket.id}>
              <div className="level">
                <div className="level-left">
                  <a>
                    <strong>
                      {project ? `${project.code}-${ticket.id}` : `UNKNOWN-${ticket.id}`}{" "}
                      {ticket.title}
                    </strong>
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
      )}
    </div>
  );
};