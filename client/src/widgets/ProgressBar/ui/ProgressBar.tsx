import {TicketList} from "@/entities/tickets/model";

export const ProgressBar = ({userTickets, isLoading} : {userTickets: TicketList, isLoading: boolean}) => {

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
          <h3 className="title">
            Задач выполнено: {isLoading ? '...' : completedTickets.length} из {isLoading ? '...' : maxTasks}
          </h3>
          <progress
            className="progress is-success is-large"
            value={isLoading ? undefined : progressPercentage}
            max="100"
          >
            {progressPercentage}%
          </progress>
        </div>
      </section>
    </div>
  );
};
