import {
    getTicketStatusClass,
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
    const currentFilters = useAppSelector((state) => state.ticket.filters)

    function applySearchFilter() {
        dispatch(ticketSlice.actions.setSearchFilter(searchText))
    }
    function applyAssigneeUserFilter() {
        dispatch(ticketSlice.actions.setAssigneeFilter(user!.id));  // фильтруем по задачам назначенным на текущего юзера
        dispatch(ticketSlice.actions.setStatusFilter([TICKET_STATUS.OPEN, TICKET_STATUS.IN_PROGRESS, TICKET_STATUS.NEED_INFO])) //и со статусом тикета - открыто

    }
    function applyStatusFilter(status: TICKET_STATUS) {               //на входе получаем status в виде строки
        dispatch(ticketSlice.actions.setStatusFilter([status]))     // передаем его в синхронный редьюсер в слайсе
        dispatch(ticketSlice.actions.setAssigneeFilter(null));   //сбрасываем фильтр по текущему юзеру, если вдруг он был
    }

    function applyAllTicketsFilter() {
        dispatch(ticketSlice.actions.setStatusFilter([]))
        dispatch(ticketSlice.actions.setAssigneeFilter(null));
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
                        onKeyUp={(e) => {(e.key === 'Enter' ? applySearchFilter() : null)}}
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
                    <a
                        className={currentFilters.assigneeIdFilter === user?.id ? 'is-active' : ''}
                        onClick={applyAssigneeUserFilter}>Мои открытые задачи</a>
                </li>
                <li>
                    <a
                        onClick={applyAllTicketsFilter}
                        className={currentFilters.assigneeIdFilter === null && currentFilters.statusFilter.length === 0 ? 'is-active' : ''}>Все задачи</a>
                    <ul>
                        {Object.keys(TICKET_STATUS).map((status) =>
                                <li key={status}>
                                    <a
                                        className={currentFilters.statusFilter.length === 1 && currentFilters.statusFilter.includes(status as TICKET_STATUS) ? 'is-active' : ''}
                                        onClick={() => applyStatusFilter(status as TICKET_STATUS)}>
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

