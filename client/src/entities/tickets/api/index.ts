import { axiosInstance } from "@/shared/lib/axiosInstance";
import { Ticket, TicketList } from "../model";




export class TicketService {

    static async createNewTicket(title:string,description:string,status:string,estimate:number,project_id:number): Promise<Ticket> {
        try {
            const response = await axiosInstance.post('/tickets', {
              title,
              description,
              status,
              estimate,
              project_id
            });

            
            return response.data.ticket;
        } catch (error) {
            console.error('Error create book:', error);
            throw new Error('Failed to create book');
        }
    }

    static async getAllTickets(search:string, assignee_id:number, status:string): Promise<TicketList> {
        try {
            const response = await axiosInstance.get('/tickets', {params:{search,assignee_id,status}});

            return response.data.tickets;
        } catch (error) {
            console.error('Error fetching all books:', error);
            throw new Error('Failed to fetch books');
        }
    }

    static async getOneTicket(id:number): Promise<Ticket> {
      try {
        const response = await axiosInstance.get('/tickets/:id',{params:{id}})
        return response.data.ticket
      } catch (error) {
        console.error('Error fetching all books:', error);
            throw new Error('Failed to fetch books');
      }
    }


    static async updateTicket(id:number,title:string,assignee_id:number, description:string,status:string,estimate:number): Promise<Ticket> {

        try {
            const response = await axiosInstance.put(`/tickets/${id}`, {
              title, assignee_id, description, status,estimate
            })
            return response.data.ticket;
        } catch (error) {
            console.error('Error updating book:', error);
            throw new Error('Failed to update book');
        }
    }

    
}