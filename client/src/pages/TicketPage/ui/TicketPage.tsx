// import { useParams } from "react-router";

// import { TicketItem } from "@/entities/tickets/ui/TicketItem";

import { getOneTicket } from "@/entities/tickets/model/TicketThunks";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function TicketPage(): JSX.Element {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { ticket } = useAppSelector((state) => state.ticket);

  useEffect((): void => {
    dispatch(getOneTicket({ id: Number(id) }));
  }, [dispatch, id]);

  console.log(111, ticket);

  return (
    <>
      {/* тут должен выводиться компонент TicketItem */}
      <h1>{id}</h1>
      <h1>{ticket?.title}</h1>

      {/* <h3 classNameName="title">Обсуждение</h3>
      <CommentsList breedId={Number(ticketId)} /> */}
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
