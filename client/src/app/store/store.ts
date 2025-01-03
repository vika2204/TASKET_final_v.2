// Импортируем редьюсер для пользователя из файла user.ts
import userReducer from "@/entities/user/model/userSlice";
import {ticketReducer} from "@/entities//tickets/model/TicketSlice";
import commentReducer from "@/entities//comment/model/commentSlice";

// Импортируем функцию configureStore из Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
import { projectReducer } from "@/entities/projects/model/ProjectSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    ticket: ticketReducer,
    project: projectReducer,
    comment: commentReducer
  },
});

// Используем typeof для получения типа getState функции хранилища
export type RootState = ReturnType<typeof store.getState>;

// Определяем тип диспатча для отправки действий
export type AppDispatch = typeof store.dispatch;

export default store;
