import { axiosInstance } from "@/shared/lib/axiosInstance";
import { Ticket, TicketList } from "../model";
import {TICKET_STATUS} from "@/shared/types/statusEnum.ts";

export class TicketService {
  static async createNewTicket(
    title: string,
    description: string,
    estimate: number,
    project_id: number
  ): Promise<Ticket> {
    try {
      const response = await axiosInstance.post(
        `/projects/${project_id}/tickets`,
        {
          title,
          description,
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
    search: string | null,
    assignee_id: number | null,
    status: TICKET_STATUS[],
    projectId: number
  ): Promise<TicketList> {
    try {
      const response = await axiosInstance.get(`/projects/${projectId}/tickets`, {
        params: { search, assignee_id, status },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching all tickets:", error);
      throw new Error("Failed to fetch tickets");
    }
  }

  static async getAllUserTickets(): Promise<TicketList> {
    try {
      const response = await axiosInstance.get(`/users/tickets`);
      console.log(response);

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
    status: TICKET_STATUS,
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

  static async ticketAnalysis(id: number): Promise<{isGoodTicket: boolean, analysis: string}> {
    try{
      const response = await axiosInstance.post(`/tickets/${id}/analysis`);
      return response.data;
    } catch(error) {
      console.error("Error analysis  ticket:", error);
      throw new Error("Failed to get ticket analysis");
    }
  }
}
