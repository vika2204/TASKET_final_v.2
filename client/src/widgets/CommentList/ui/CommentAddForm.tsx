import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks.ts";
import { createComment } from "@/entities/comment";

type propsCommentAddForm = {
  ticketId: number;
  onCommentAdd: () => void;
};

export function CommentAddForm(props: propsCommentAddForm): JSX.Element {
  const [commentText, setCommentText] = useState("");
  const dispatch = useAppDispatch();

  const sendComment = async (): Promise<void> => {
    await dispatch(
      createComment({ breedId: props.breedId, text: commentText })
    );
    setCommentText("");
    props.onCommentAdd();
  };
  return (
    <>
      <article className="media">
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                onChange={(event) => setCommentText(event.target.value)}
                value={commentText}
                className="textarea"
                placeholder="Add a comment..."
              ></textarea>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button onClick={sendComment} className="button">
                Оставить комментарий
              </button>
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
