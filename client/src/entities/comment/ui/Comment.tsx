import { CommentType } from "@/entities/comment/model";

type propsComment = {
  data: CommentType;
};

export function Comment(props: propsComment): JSX.Element {
  const { username } = props.data.user;
  const { createdAt: time } = props.data;
  const { text } = props.data;

  return (
    <div className="box">
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>@{username}</strong>
              <br />
              {text}
              <br />
              <small>{new Date(time).toLocaleString()}</small>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
