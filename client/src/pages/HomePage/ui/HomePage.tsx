import { ProjectsDropDown } from "@/features/projects";
import { CreateTicketButton } from "@/features/ticket";
import { TicketList } from "@/widgets/TicketList";

export function HomePage() {


  return (
  
  <>

<ProjectsDropDown />
<CreateTicketButton />

    <TicketList/>
  </>
  



)
}
