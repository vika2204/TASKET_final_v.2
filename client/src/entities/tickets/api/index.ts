import { axiosInstance } from "@/shared/lib/axiosInstance";
import { Ticket, TicketList } from "../model";

export class TicketService {
  static async createNewTicket(
    title: string,
    description: string,
    status: string,
    estimate: number,
    project_id: number
  ): Promise<Ticket> {
    try {
      const response = await axiosInstance.post(
        `/projects/${project_id}/tickets`,
        {
          title,
          description,
          status,
          estimate,
        }
      );
      return response.data.ticket;
    } catch (error) {
      console.error("Error create ticket:", error);
      throw new Error("Failed to create ticket");
    }
  }

  static async getAllTickets(
    search: string,
    assignee_id: number | undefined,
    status: string
  ): Promise<TicketList> {
    try {
      const response = await axiosInstance.get(`/projects/1/tickets`, {
        params: { search, assignee_id, status },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching all tickets:", error);
      throw new Error("Failed to fetch tickets");
    }
  }

  static async getOneTicket(id: number): Promise<Ticket> {
    try {
      const response = await axiosInstance.get(`/tickets/${id}`);
      return response.data.ticket;
    } catch (error) {
      console.error("Error fetching all tickets:", error);
      throw new Error("Failed to fetch tickets");
    }
  }

  static async updateTicket(
    id: number,
    title: string,
    assignee_id: number,
    description: string,
    status: string,
    estimate: number
  ): Promise<Ticket> {
    try {
      const response = await axiosInstance.put(`/tickets/${id}`, {
        title,
        assignee_id,
        description,
        status,
        estimate,
      });
      return response.data.ticket;
    } catch (error) {
      console.error("Error updating ticket:", error);
      throw new Error("Failed to update ticket");
    }
  }
}
