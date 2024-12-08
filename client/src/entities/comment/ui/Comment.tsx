import { CommentType } from "@/entities/comment/model";

type propsComment = {
  data: CommentType;
};

export function Comment(props: propsComment): JSX.Element {
  return (
    <div className="box">
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>Имя пользователя - @{props.data.user_id}</strong>
              <br />
              {props.data.text}
              <br />
              <small>{new Date(props.data.createdAt).toLocaleString()}</small>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
