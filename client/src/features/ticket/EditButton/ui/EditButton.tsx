import { useState } from "react";
import { FormEditTicket } from "./FormEditTicket";
import { Ticket } from "@/entities/tickets/model";

export function EditButton({ticket}:{ticket:Ticket}) {
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
      <span>Редактировать</span>
    </button>
          {isModalOpen && <FormEditTicket onClose={handleCloseModal} ticket={ticket} />}
          </>
  );
}
