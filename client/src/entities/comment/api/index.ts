import { axiosInstance } from "@/shared/lib/axiosInstance.ts";
import { CommentType } from "@/entities/comment/model";

export class CommentService {


  static async getComments(ticketId: number): Promise<CommentType[]> {
    const response = await axiosInstance.get<CommentType[]>(
      `/tickets/${ticketId}/comments`
    );
    return response.data;
  }

  static async getUserComments(): Promise<CommentType[]> {
    const response = await axiosInstance.get<CommentType[]>(
      `/users/comments`
    );
    return response.data;
  }

  static async createComment({
    ticketId,
    text,
  }: {
    ticketId: number;
    text: string;
  }): Promise<CommentType> {
    const response = await axiosInstance.post<CommentType>(
      `/tickets/${ticketId}/comments`,
      {
        text: text,
      }
    );
    return response.data;
  }
}
