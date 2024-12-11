import { getOneTicket } from "@/entities/tickets/model/TicketThunks";
import { TicketItem } from "@/entities/tickets/ui/TicketItem";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { CommentsList } from "@/widgets/CommentList";
import { useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import { AiAdvice } from "@/features/ticket/AI";

export function TicketPage(): JSX.Element {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { ticket, loading } = useAppSelector((state) => state.ticket);

  useEffect((): void => {
    dispatch(getOneTicket({ id: Number(id) }));
  }, [dispatch, id]);

  useEffect(() => {
    document.title = `${ticket?.project.code}-${ticket?.id} ${ticket?.title} - TASKET`;
  }, [ticket]);

  if (!loading && ticket === null) {
    return <div className="box">
      <h1 className="title">Задача не найдена</h1>
      <Link className="button" to={'/'}>Вернуться на главную</Link>
    </div>
  }

  return (
    <>
      {ticket !== null && <>
        <TicketItem ticket={ticket} />
        <AiAdvice key={id} ticketId={Number(id)} />
        <CommentsList id={Number(id)} />
      </>}
    </>
  );
}
