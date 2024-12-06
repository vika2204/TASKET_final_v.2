import { createSlice } from "@reduxjs/toolkit";
import { Ticket, TicketList } from ".";
import {
  getAllTickets,
  getOneTicket,
  createNewTicket,
  updateTicket
} from "./TicketThunks";

type TicketState = {
  ticketList: TicketList;
  ticket:Ticket|null
  error: string | null;
  loading: boolean;
};

const initialState: TicketState = {
  ticketList: [],
  ticket: null,
  error: null,
  loading: false,
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewTicket.fulfilled, (state, action) => {
        state.ticketList = [...state.ticketList, action.payload];
        state.loading = false;
        state.error = null;
      })
      .addCase(createNewTicket.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getOneTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneTicket.fulfilled, (state, action) => {
        state.ticket = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getOneTicket.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.ticketList = state.ticketList.map((el) =>
          el.id === action.payload.id ? action.payload : el
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(updateTicket.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.ticketList = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllTickets.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default ticketSlice.reducer;
