
import { Ticket } from "@/entities/tickets/model";
import { updateTicket } from "@/entities/tickets/model/TicketThunks";
import {useAppDispatch} from "@/shared/hooks/rtkHooks";
import {useState} from "react";


type FormEditTicketProps = {
  onClose: () => void;
  ticket:Ticket
};

export function FormEditTicket({ onClose,ticket }: FormEditTicketProps) {
  const [title, setTitle] = useState<string>(ticket.title);
  const [description, setDescription] = useState<string>(ticket.description);
  const [estimate, setEstimate] = useState<string>(ticket.estimate.toString());

  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      updateTicket({
        id:ticket.id,
        title,
        assignee_id:ticket.assignee_id,
        description,
        status:ticket.status,
        estimate: Number(estimate)
      })
    );

    onClose();
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Редактировать задачу</p>
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
                <button className="button is-info" type="submit">
                  Применить
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
