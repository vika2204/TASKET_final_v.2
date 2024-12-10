import {createNewTicket, getAllTickets} from "@/entities/tickets/model/TicketThunks";
import {useAppDispatch, useAppSelector} from "@/shared/hooks/rtkHooks";
import {useState} from "react";
import {RichEditor} from "@/widgets/RichEditor";

type FormCreateTicketProps = {
  onClose: () => void;
};

export function FormCreateTicket({ onClose }: FormCreateTicketProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [estimate, setEstimate] = useState<string>("");
  const currentProject = useAppSelector((state) => state.project.currentProject)
  const { searchFilter, statusFilter, assigneeIdFilter } = useAppSelector((state) => state.ticket.filters);

  // const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(
      createNewTicket({
        title,
        description,
        estimate: Number(estimate),
        project_id: currentProject.id,
      })
    ).unwrap();

    dispatch(getAllTickets({
      search: searchFilter,
      assignee_id: assigneeIdFilter,
      status: statusFilter,
      projectId: currentProject.id
    }));

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
