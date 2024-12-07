// import { useParams } from "react-router";

export function TicketPage(): JSX.Element {
//   const { ticketId } = useParams() as { ticketId: string };

  return (
    <>
      {/* тут должен выводиться компонент TicketItem */}

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
