import { getAllTickets } from "@/entities/tickets/model/TicketThunks";
import { TicketItem } from "@/entities/tickets/ui/TicketItem";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { useEffect } from "react";

export function TicketList() {
  const { ticketList } = useAppSelector(state => state.ticket);
  const dispatch = useAppDispatch();

  const {searchFilter, statusFilter, assigneeIdFilter} = useAppSelector((state) => state.ticket.filters)


  useEffect(()=>{dispatch(getAllTickets({search:searchFilter,assignee_id:assigneeIdFilter,status:statusFilter}))},[dispatch,searchFilter,assigneeIdFilter,statusFilter])

  return (
    <div>
      {ticketList.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
