import { useEffect, useState } from "react";
import { useAppDispatch } from "@/shared/hooks/rtkHooks.ts";
import { CommentType, getComments, Comment } from "@/entities/comment";
import { CommentAddForm } from "@/widgets/CommentList";

type propsCommentList = {
  id: number;
};

export function CommentsList({ id }: propsCommentList): JSX.Element {
  const [comments, setComments] = useState<CommentType[]>([]);
  const dispatch = useAppDispatch();

  const loadComments = async (): Promise<void> => {
    try {
      const payload = await dispatch(getComments(id)).unwrap();
      setComments(payload);
    } catch (error) {
      console.error("Failed to load comments", error);
    }
  };

  useEffect((): void => {
    loadComments();
  }, []);

  return (
    <>
      {comments.length === 0 ? (
        <h6 className="title is-6">Нет комментарий...</h6>
      ) : (
        comments.map(
          (comment: CommentType): JSX.Element => (
            <Comment data={comment} key={comment.id} />
          )
        )
      )}

      <CommentAddForm id={id} onCommentAdd={loadComments} />
    </>
  );
}
