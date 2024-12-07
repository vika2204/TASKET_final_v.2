import { Ticket } from "../model";


export function TicketItem({ticket}:{ticket:Ticket}) {
    return (
        <>
            {ticket.title}
        </>
    );
}

