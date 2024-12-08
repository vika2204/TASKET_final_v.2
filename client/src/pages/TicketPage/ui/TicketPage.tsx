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

      <article className="media">
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                className="textarea"
                placeholder="Add a comment..."
              ></textarea>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button">Оставить комментарий</button>
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
