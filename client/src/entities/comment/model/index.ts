import { UserType } from "@/entities/user";

export type CommentType = {
  id: number;
  user_id: number;
  text: string;
  ticket_id: number;
  user: UserType;
  createdAt: string;
};
