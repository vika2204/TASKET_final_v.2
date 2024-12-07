import { useState } from "react";
import { FormCreateTicket } from "./FormCreateTicket";

export function CreateTicketButton() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="level">
        <div className="level-left"></div>
        <div className="level-right">
          <button className="button is-info" onClick={handleOpenModal}>
            Создать задачу
          </button>
        </div>
      </div>
      {isModalOpen && <FormCreateTicket onClose={handleCloseModal} />}
    </>
  );
}
