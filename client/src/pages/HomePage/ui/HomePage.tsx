import { ProjectsDropDown } from "@/features/projects";
import { CreateTicketButton } from "@/features/ticket";
import { TicketList } from "@/widgets/TicketList";
import { useEffect } from "react";


export function HomePage() {

  useEffect(() => {
    document.title = "Просмотр задач - TASKET";
  }, []);

  return (
    <>
      <div className="level">
        <ProjectsDropDown />
        <CreateTicketButton />
      </div>
      <TicketList />
    </>
  );
}
