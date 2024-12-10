import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilterType, Ticket, TicketList} from ".";
import {
  getAllTickets,
  getOneTicket,
  createNewTicket,
  updateTicket
} from "./TicketThunks";
import {TICKET_STATUS} from "@/shared/types/statusEnum.ts";

type TicketState = {
  ticketList: TicketList;
  ticket: Ticket | null;
  filters: FilterType;
  error: string | null;
  loading: boolean;
};

const initialState: TicketState = {
  ticketList: [],
  ticket: null,
  error: null,
  loading: false,
  filters: {
    searchFilter: null,
    statusFilter: [],
    assigneeIdFilter: null
  }
};

export const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setSearchFilter(state, action: PayloadAction<string | null>) {
      state.filters.searchFilter = action.payload
    },
    setAssigneeFilter(state, action: PayloadAction<number | null>) {
      state.filters.assigneeIdFilter = action.payload
    },
    setStatusFilter(state, action: PayloadAction<TICKET_STATUS[]>) {
      state.filters.statusFilter = action.payload
    },
  },
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
        state.ticket = null;
      })
      .addCase(updateTicket.pending, (state) => {
        state.loading = true;
        state.ticket = null;
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.ticketList = state.ticketList.map((el) =>
          el.id === action.payload.id ? action.payload : el
        );
        state.ticket = action.payload;
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

export const ticketReducer = ticketSlice.reducer;
