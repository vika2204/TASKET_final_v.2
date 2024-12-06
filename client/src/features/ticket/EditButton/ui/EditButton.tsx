export function EditButton() {
  return (
    <button
      className="button"
      aria-haspopup="true"
      aria-controls="dropdown-menu"
    >
      <span className="icon is-small">
        <i className="fas fa-pen" aria-hidden="true"></i>
      </span>
      <span>Редактировать</span>
    </button>
  );
}
