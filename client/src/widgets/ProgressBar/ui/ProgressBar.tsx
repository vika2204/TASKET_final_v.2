import { useAppSelector } from "@/shared/hooks/rtkHooks";

export const ProgressBar = () => {
  const { user } = useAppSelector((state) => state.user);
  const { ticketList } = useAppSelector((state) => state.ticket);

  // Фильтруем задачи, назначенные текущему пользователю
  const userTickets = ticketList.filter(
    (ticket) => ticket.assignee_id === user?.id
  );

  // Считаем выполненные задачи (статус "DONE")
  const completedTickets = userTickets.filter(
    (ticket) => ticket.status === "DONE"
  );

  // Считаем активные задачи (статус не "DONE" и не "CANCELED")
  const activeTickets = userTickets.filter(
    (ticket) => ticket.status !== "DONE" && ticket.status !== "CANCELED"
  );

  // Максимальное количество задач (сумма активных и выполненных задач)
  const maxTasks = activeTickets.length + completedTickets.length;

  // Процент выполнения
  const progressPercentage =
    maxTasks > 0 ? (completedTickets.length / maxTasks) * 100 : 0;

  return (
    <div>
      <section className="section">
        <div className="box">
          <p>{user?.email}</p>
          <h3 className="title">
            Задач выполнено: {completedTickets.length} из {maxTasks}
          </h3>
          <progress
            className="progress is-success is-large"
            value={progressPercentage}
            max="100"
          >
            {progressPercentage}%
          </progress>
        </div>
      </section>
    </div>
  );
};