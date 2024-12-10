import {TICKET_STATUS} from "@/shared/types/statusEnum.ts";
import {Project} from "@/entities/projects";

export type Ticket = {
  id: number;
  title: string;
  author_id: number;
  assignee_id: number
  description: string;
  status: TICKET_STATUS;
  estimate: number;
  project_id: number;
  project: Project;
};

export type TicketList = Ticket[];
export type FilterType = {
  searchFilter: string | null;
  statusFilter: TICKET_STATUS[];
  assigneeIdFilter: number | null;
}
