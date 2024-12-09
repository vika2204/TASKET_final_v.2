export function ChangePassBtn() {
  return (
    <button
      className="button"
      aria-haspopup="true"
      aria-controls="dropdown-menu"
    >
      <span className="icon is-small">
        <i className="fas fa-pen" aria-hidden="true"></i>
      </span>
      <span>Сменить пароль</span>
    </button>
  );
}
