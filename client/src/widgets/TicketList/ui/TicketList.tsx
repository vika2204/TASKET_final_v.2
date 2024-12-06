import { getAllTickets } from "@/entities/tickets/model/TicketThunks";
import { TicketItem } from "@/entities/tickets/ui/TicketItem";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { useEffect, useState } from "react";
import {TICKET_STATUS} from "@/shared/types/statusEnum.ts";


export function TicketList() {


const {ticketList} = useAppSelector(state=>state.ticket)
const dispatch= useAppDispatch()

const[search,setSearch] = useState<string>('')
const[assignee_id,setAssignee_id] = useState<number|undefined>()
const[status,setStatus] = useState(TICKET_STATUS.OPEN)


useEffect(()=>{dispatch(getAllTickets({search:search,assignee_id:assignee_id,status:status}))},[dispatch,search,assignee_id,status])




  return (
    <div>
{ticketList.map((ticket)=><TicketItem key={ticket.id} ticket={ticket}></TicketItem>)}
    </div>
  );
}

