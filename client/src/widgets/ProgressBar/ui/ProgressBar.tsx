import {TicketList} from "@/entities/tickets/model";
import {useEffect, useState} from "react";
import {TicketService} from "@/entities/tickets/api";
import {useAppDispatch, useAppSelector} from "@/shared/hooks/rtkHooks.ts";
import {getAllProjects} from "@/entities/projects/model/ProjectThunk.ts";

export const ProgressBar = () => {
  const dispatch = useAppDispatch();
  const [ userTickets, setUserTickets] = useState<TicketList>([]);
  const [ isLoading, setIsLoading] = useState<boolean>(true);
  const { user} = useAppSelector((state) => state.user)

  async function loadUserTickets() {
    // запросим список всех проектов
    const projectList = await dispatch(getAllProjects()).unwrap();
    let allTickets: TicketList = [];

    for (let project of projectList) {
      // соберём список всех тикетов, назначенных на юзера (из каждого проекта)
      allTickets = [...allTickets, ...await TicketService.getAllTickets(null, user!.id, [], project.id)]
    }

    setUserTickets(allTickets)
    setIsLoading(false);
  }

  useEffect(() => {
    loadUserTickets()
  }, []);

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
