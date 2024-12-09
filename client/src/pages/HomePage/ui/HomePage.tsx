import { ProjectsDropDown } from "@/features/projects";
import { CreateTicketButton } from "@/features/ticket";
import { TicketList } from "@/widgets/TicketList";

export function HomePage() {
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
