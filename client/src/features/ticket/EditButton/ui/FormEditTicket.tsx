import { Ticket } from "@/entities/tickets/model";
import { updateTicket } from "@/entities/tickets/model/TicketThunks";
import {useAppDispatch} from "@/shared/hooks/rtkHooks";
import {useEffect, useRef, useState} from "react";
import {RichEditor} from "@/widgets/RichEditor";


type FormEditTicketProps = {
  onClose: () => void;
  ticket:Ticket
};

export function FormEditTicket({ onClose,ticket }: FormEditTicketProps) {
  const [title, setTitle] = useState<string>(ticket.title);
  const [description, setDescription] = useState<string>(ticket.description);
  const [estimate, setEstimate] = useState<string>(ticket.estimate.toString());
  const titleInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
      titleInput.current?.focus();
  }, [])

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
      <div className="modal-card" style={{width: '800px'}}>
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
                  ref={titleInput}
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
                  <RichEditor state={description} setState={setDescription}/>
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
                  min="1"
                  step="1"
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
