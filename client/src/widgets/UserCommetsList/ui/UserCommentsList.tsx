import { CommentType } from "@/entities/comment";
import { CommentService } from "@/entities/comment/api";
import { useAppSelector } from "@/shared/hooks/rtkHooks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserCommentsList = () => {
  const { ticketList } = useAppSelector((state) => state.ticket);
  const { projectList } = useAppSelector((state) => state.project);

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
          .filter((comment) => {
            // Находим тикет по ticket_id
            const ticket = ticketList.find((ticket) => ticket.id === comment.ticket_id);
            return ticket !== undefined; // Оставим только комментарии с найденным тикетом
          })
          .map((comment) => {
            // Находим тикет по ticket_id
            const ticket = ticketList.find((ticket) => ticket.id === comment.ticket_id);
            // Находим проект по project_id тикета
            const project = projectList.find((project) => project.id === ticket?.project_id);

            return (
              <div className="box" key={comment.id}>
                <div className="level">
                  <div className="level-left">{comment.text}</div>
                  <div className="level-right">
                    <a>
                    <Link to={`/tickets/${ticket?.id}`}>
                      <strong>
                        {project ? `${project.code}-${ticket?.id}` : `UNKNOWN-${ticket?.id}`}
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