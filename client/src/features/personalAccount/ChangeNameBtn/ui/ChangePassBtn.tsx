import {  useState } from "react";
import { FormChangePass } from "./FormChangePass";

export function ChangePassBtn() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
        <span>Сменить пароль</span>
      </button>
      {isModalOpen && <FormChangePass onClose={handleCloseModal} />}
    </>
  );
}
