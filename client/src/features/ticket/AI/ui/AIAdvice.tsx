import {TicketService} from "@/entities/tickets/api";
import {useEffect, useState} from "react";
import {useAppSelector} from "@/shared/hooks/rtkHooks.ts";


export function AiAdvice({ticketId}: {ticketId: number}) {
    const [analysis, setAnalysis] = useState<{isGoodTicket: boolean, analysis: string} | null>(null);
    const currentTicket = useAppSelector((state) => state.ticket.ticket)

    useEffect(() => {
        loadAiAdvice()
    }, [ticketId, currentTicket?.description, currentTicket?.estimate])


    async function loadAiAdvice(){
       const data = await TicketService.ticketAnalysis(ticketId!);
       setAnalysis(data);
    }
    if(analysis === null) {
        return <div className="notification">Анализируем задачу...</div>
    }
    return (
        <>
            <article
                className={analysis.isGoodTicket ? "message is-success" : "message is-warning"}
            >
                <div className="message-header">
                    <p>AI анализ задачи</p>
                </div>
                <div className="message-body">
                    {analysis.analysis}
                </div>
            </article>
        </>
    );
}

