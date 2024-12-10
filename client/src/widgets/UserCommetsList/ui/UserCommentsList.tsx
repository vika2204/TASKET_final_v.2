import { CommentType } from "@/entities/comment";
import { CommentService } from "@/entities/comment/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {truncate} from "@/shared/lib/truncate.ts";

export const UserCommentsList = () => {
  const [comments, setComments] = useState<CommentType[]>([]); // Состояние для хранения комментариев
  const [loading, setLoading] = useState(true); // Состояние для индикации загрузки
  const [error, setError] = useState<string | null>(null); // Состояние для хранения ошибок

  // Функция для загрузки комментариев
  const fetchComments = async () => {
    try {
      const fetchedComments = await CommentService.getUserComments();
      setComments(fetchedComments);
    } catch (err) {
      console.error(err)
      setError("Ошибка при загрузке комментариев");
    } finally {
      setLoading(false);
    }
  };

  // Загрузка комментариев при монтировании компонента
  useEffect(() => {
    fetchComments();
  }, []);

  // Фильтруем комментарии, принадлежащие текущему пользователю
  const userComments = comments
    .sort((a, b) => b.id - a.id) // Сортируем по убыванию id (последние комментарии в начале)
    .slice(0, 5); // Берем только 5 последних комментариев

  return (
    <div className="column is-half">
      <h5 className="title">Ваши последние комментарии</h5>
      {loading ? (
        <p>Загрузка комментариев...</p>
      ) : error ? (
        <p>{error}</p>
      ) : userComments.length > 0 ? (
        userComments
          .map((comment) => {
            return (
              <div className="box" key={comment.id}>
                <div className="level">
                  <div className="level-left">{truncate(comment.text, 40)}</div>
                  <div className="level-right">
                    <a>
                    <Link to={`/tickets/${comment.ticket.id}`}>
                      <strong>
                        {`${comment.ticket.project.code}-${comment.ticket.id}`}
                      </strong>
                      </Link>
                    </a>
                  </div>
                </div>
              </div>
            );
          })
      ) : (
        <p>У вас нет комментариев.</p>
      )}
    </div>
  );
};
