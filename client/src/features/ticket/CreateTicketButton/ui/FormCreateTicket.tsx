import { createNewTicket } from "@/entities/tickets/model/TicketThunks";
import { useAppDispatch } from "@/shared/hooks/rtkHooks";
import { useState } from "react";

type FormCreateTicketProps = {
  onClose: () => void;
};

export function FormCreateTicket({ onClose }: FormCreateTicketProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [estimate, setEstimate] = useState<string>("");

  // const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      createNewTicket({
        title,
        description,
        status: "Ожидает разработки",
        estimate: Number(estimate),
        project_id: 1,
      })
    );

    onClose();
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Создать задачу</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Заголовок</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Описание</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>

            <div className="field">
              <label className="label">Оценка (часы)</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  value={estimate}
                  onChange={(e) => setEstimate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-primary" type="submit">
                  Создать
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
