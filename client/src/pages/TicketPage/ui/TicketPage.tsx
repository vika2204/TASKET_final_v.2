import { getOneTicket } from "@/entities/tickets/model/TicketThunks";
import { TicketItem } from "@/entities/tickets/ui/TicketItem";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { CommentsList } from "@/widgets/CommentList";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function TicketPage(): JSX.Element {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { ticket } = useAppSelector((state) => state.ticket);

  useEffect((): void => {
    dispatch(getOneTicket({ id: Number(id) }));
  }, [dispatch, id]);

  return (
    <>
      {ticket === null ? "" : <TicketItem ticket={ticket} />}
      <h3 className="title">Комментарии</h3>
      <CommentsList id={Number(id)} />
    </>
  );
}
