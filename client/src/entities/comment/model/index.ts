import { UserType } from "@/entities/user";
import {Ticket} from "@/entities/tickets/model";

export type CommentType = {
  id: number;
  user_id: number;
  text: string;
  ticket_id: number;
  user: UserType;
  ticket: Ticket;
  createdAt: string;
};
