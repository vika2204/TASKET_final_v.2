import {TicketService} from "@/entities/tickets/api";
import {useEffect, useState} from "react";


export function AiAdvice({ticketId}: {ticketId: number}) {
    const [analysis, setAnalysis] = useState<{isGoodTicket: boolean, analysis: string} | null>(null);


    useEffect(() => {
        loadAiAdvice()
    }, [ticketId])


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

