import { TicketService } from "@/entities/tickets/api";
import { TicketList } from "@/entities/tickets/model";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {truncate} from "@/shared/lib/truncate.ts";
import {getTicketStatusClass, getTicketStatusName} from "@/shared/types/statusEnum.ts";

export const ActiveUserTasks = () => {
  const [ticketList, setTicketList] = useState<TicketList>([]);

  const getAllTickets = async () => {
    const response = await TicketService.getAllUserTickets();
    setTicketList(response);
  };

  useEffect(() => {
    getAllTickets();
  }, []);

  // Фильтруем и сортируем тикеты пользователя
  const userTickets = ticketList
      .sort((a, b) => b.id - a.id) // Сортируем по убыванию id
      .slice(0, 5); // Берем только 5 последних

  return (
      <div className="column is-half">
        <h5 className="title">Ваши задачи</h5>
        {userTickets ? (
            userTickets.length > 0 ? (
                userTickets.map((ticket) => {
                  return (
                      <div className="box" key={ticket.id}>
                        <div className="level">
                          <div className="level-left">
                            <Link to={`/tickets/${ticket.id}`} title={ticket.title}>
                              <strong>
                                {`${ticket.project.code}-${ticket.id} `}
                                {truncate(ticket.title, 20)}
                              </strong>
                            </Link>
                          </div>
                          <div className="level-right">
                    <span
                        className={`tag is-light has-text-weight-bold is-uppercase ${
                            getTicketStatusClass(ticket.status)
                        }`}
                    >
                      {getTicketStatusName(ticket.status)}
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
