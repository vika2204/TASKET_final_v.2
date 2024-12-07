import {TICKET_STATUS} from "@/shared/types/statusEnum.ts";

export type Ticket = {
  id: number;
  title: string;
  author_id: number;
  assignee_id: number|undefined;
  description: string;
  status: TICKET_STATUS;
  estimate: number;
  project_id: number;
};

export type TicketList = Ticket[];
