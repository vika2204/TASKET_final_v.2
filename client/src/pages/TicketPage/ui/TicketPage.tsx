import { getOneTicket } from "@/entities/tickets/model/TicketThunks";
import { TicketItem } from "@/entities/tickets/ui/TicketItem";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { CommentsList } from "@/widgets/CommentList";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiAdvice } from "@/features/ticket/AI";

export function TicketPage(): JSX.Element {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { currentProject } = useAppSelector((state) => state.project);

  const { ticket } = useAppSelector((state) => state.ticket);

  useEffect((): void => {
    dispatch(getOneTicket({ id: Number(id) }));
  }, [dispatch, id]);

  useEffect(() => {
    document.title = `TASKET-${currentProject.code}-${ticket?.id}`;
  }, [currentProject,ticket]);

  return (
    <>
      {ticket === null ? "" : <TicketItem ticket={ticket} />}
      <AiAdvice key={id} ticketId={Number(id)} />
      <h3 className="title">Комментарии</h3>
      <CommentsList id={Number(id)} />
    </>
  );
}
