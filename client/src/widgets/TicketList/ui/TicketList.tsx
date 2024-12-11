import { getAllTickets } from "@/entities/tickets/model/TicketThunks";
import { TicketItem } from "@/entities/tickets/ui/TicketItem";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { useEffect, useState } from "react";

export function TicketList() {
  const { ticketList } = useAppSelector(state => state.ticket);
  const { currentProject } = useAppSelector(state => state.project);
  const dispatch = useAppDispatch();

  const { searchFilter, statusFilter, assigneeIdFilter } = useAppSelector((state) => state.ticket.filters);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Количество элементов на странице

  useEffect(() => {
    dispatch(getAllTickets({
      search: searchFilter,
      assignee_id: assigneeIdFilter,
      status: statusFilter,
      projectId: currentProject.id
    }));
    setCurrentPage(1);
  }, [dispatch, searchFilter, assigneeIdFilter, statusFilter, currentProject]);


  const getCurrentPageItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return ticketList.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Функция для генерации номеров страниц
  const getPageNumbers = () => {
    const pageCount = Math.ceil(ticketList.length / itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < getPageNumbers().length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };


  const shouldShowPagination = ticketList.length > itemsPerPage;

  return (
    <div>
      {getCurrentPageItems().map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}


      {shouldShowPagination && (
        <nav className="pagination" role="navigation" aria-label="pagination">
          <a
            className={`pagination-previous ${currentPage === 1 ? 'is-disabled' : ''}`}
            title="This is the first page"
            onClick={handlePrevPage}
          >
            Предыдущая страница
          </a>
          <a
            className="pagination-next"
            onClick={handleNextPage}
          >
            Следующая страница
          </a>
          <ul className="pagination-list">
            {getPageNumbers().map((number) => (
              <li key={number}>
                <a
                  className={`pagination-link ${number === currentPage ? 'is-current' : ''}`}
                  aria-label={`Goto page ${number}`}
                  onClick={() => handlePageChange(number)}
                >
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
