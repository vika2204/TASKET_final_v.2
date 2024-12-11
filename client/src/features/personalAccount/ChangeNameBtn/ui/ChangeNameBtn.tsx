import { useState } from "react";
import { FormChangeName } from "./FormChangeName"; // Убедитесь, что путь к компоненту правильный

export function ChangeNameBtn() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // 123
  return (
    <>
      <button
        className="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        onClick={handleOpenModal}
      >
        <span className="icon is-small">
          <i className="fas fa-pen" aria-hidden="true"></i>
        </span>
        <span>Изменить имя пользователя</span>
      </button>
      {isModalOpen && <FormChangeName onClose={handleCloseModal} />}
    </>
  );
}
