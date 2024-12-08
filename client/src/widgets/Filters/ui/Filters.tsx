import {
    getTicketStatusClass,
    getTicketStatusEnumFromString,
    getTicketStatusName,
    TICKET_STATUS
} from "@/shared/types/statusEnum.ts";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "@/shared/hooks/rtkHooks.ts";
import {ticketSlice} from "@/entities/tickets/model/TicketSlice.ts";


export function Filters() {
    const [searchText, setSearchText] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const {user} = useAppSelector((state) => state.user)

    function applySearchFilter() {
        dispatch(ticketSlice.actions.setSearchFilter(searchText))
    }
    function applyAssigneeUserFilter() {
        dispatch(ticketSlice.actions.setAssigneeFilter(user!.id));  // фильтруем по задачам назначенным на текущего юзера
        dispatch(ticketSlice.actions.setStatusFilter(TICKET_STATUS.OPEN)) //и со статусом тикета - открыто

    }
    function applyStatusFilter(status: string) {               //на входе получаем status в виде строки
        const enumStatus = getTicketStatusEnumFromString(status);   //при помощи ф-и переводим строку в ENUM
        dispatch(ticketSlice.actions.setStatusFilter(enumStatus))     // передаем его в синхронный редьюсер в слайсе
        dispatch(ticketSlice.actions.setAssigneeFilter(null));   //сбрасываем фильтр по текущему юзеру, если вдруг он был
    }




    return (
        <>
            <p className="menu-label">Задачи</p>
            <div className="field has-addons">
                <p className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="Поиск"
                        onChange={(event) => setSearchText(event.target.value)}
                    />
                </p>
                <p className="control">
                    <button className="button" onClick={applySearchFilter}>
              <span className="icon">
                <i className="fas fa-magnifying-glass"></i>
              </span>
                    </button>
                </p>
            </div>
            <ul className="menu-list">
                <li>
                    <a onClick={applyAssigneeUserFilter}>Мои открытые задачи</a>
                </li>
                <li>
                    <a>Все задачи</a>
                    <ul>
                        {Object.keys(TICKET_STATUS).map((status) =>
                                <li key={status}>
                                    <a onClick={() => applyStatusFilter(status)}>
                  <span className={`tag ${getTicketStatusClass(status)} is-light has-text-weight-bold is-uppercase`}>
                    {getTicketStatusName(status)}
                  </span>
                                    </a>
                                </li>
                        )}
                    </ul>
                </li>
            </ul>
        </>
    );
}

