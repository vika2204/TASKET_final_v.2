import {axiosInstance} from "@/shared/lib/axiosInstance.ts";
import {CommentType} from "@/entities/comment/model";


export class CommentService {
    static async getComments(ticketId: number): Promise<CommentType[]> {
        const response = await axiosInstance.get<CommentType[]>(`/breed/${ticketId}/comment`);
        return response.data;
    }

    static async createComment({ticketId, text}: {ticketId: number, text: string}): Promise<CommentType> {
        const response = await axiosInstance.post<CommentType>(`/breed/${ticketId}/comment`, {
            text: text,                                           //userId не передаем, он автоматом придет из res.locals в контроллер
        });
        return response.data;
    }
}

