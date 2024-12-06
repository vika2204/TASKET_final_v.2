export type Ticket = {
  id: number;
  title: string;
  author_id: number;
  assignee_id: number;
  description: string;
  status: string;
  estimate: number;
  project_id: number;
};

export type TicketList = Ticket[];
