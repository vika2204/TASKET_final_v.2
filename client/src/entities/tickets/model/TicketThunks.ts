import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Ticket, TicketList } from ".";
import { TicketService } from "../api";

type rejectValue = {
  message: string;
};

export const getAllTickets = createAsyncThunk<
  TicketList,
  {search:string, assignee_id:number, status:string},
  { rejectValue: rejectValue }
>("get/tickets", async ({search, assignee_id, status}, { rejectWithValue }) => {
  try {
    return await TicketService.getAllTickets(search, assignee_id, status);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});

export const getOneTicket = createAsyncThunk<
  Ticket,
  {id:number},
  { rejectValue: rejectValue }
>("get/one/ticket", async ({id}, { rejectWithValue }) => {
  try {
    return await TicketService.getOneTicket(id);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});

export const createNewTicket = createAsyncThunk<
  Ticket,
  {
    title:string,description:string,status:string,estimate:number,project_id:number
  },
  { rejectValue: rejectValue }
>(
  "create/ticket",
  async ({ title, description, status, estimate,project_id }, { rejectWithValue }) => {
    try {
      return await TicketService.createNewTicket(title, description, status, estimate,project_id);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  }
);

export const updateTicket = createAsyncThunk<
  Ticket,
  {
   id:number, title:string, assignee_id:number, description:string, status:string, estimate:number
  },
  { rejectValue: rejectValue }
>(
  "update/ticket",
  async ({ id, title, assignee_id, description, status,estimate }, { rejectWithValue }) => {
    try {
      return await TicketService.updateTicket(
        id,title, assignee_id, description, status,estimate
      );
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  }
);


