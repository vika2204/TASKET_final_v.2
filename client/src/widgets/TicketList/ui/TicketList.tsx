import { getAllTickets } from "@/entities/tickets/model/TicketThunks";
import { TicketItem } from "@/entities/tickets/ui/TicketItem";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { useEffect, useState } from "react";


export function TicketList() {


const {ticketList} = useAppSelector(state=>state.ticket)
const dispatch= useAppDispatch()

const[search,setSearch] = useState<string>('фикс')
const[assignee_id,setAssignee_id] = useState<number|undefined>()
const[status,setStatus] = useState('Ожидает разработки')


useEffect(()=>{dispatch(getAllTickets({search:search,assignee_id:assignee_id,status:status}))},[dispatch,search,assignee_id,status])

console.log(ticketList);


  return (
    <div>
{ticketList.map((ticket)=><TicketItem key={ticket.id} ticket={ticket}></TicketItem>)}
    </div>
  );
}

