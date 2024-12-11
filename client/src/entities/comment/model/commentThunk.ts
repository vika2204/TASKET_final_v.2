import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CommentService } from "@/entities/comment/api";
import { CommentType } from "@/entities/comment/model/index.ts";

type RejectValue = {
  message: string;
};

enum COMMENT_THUNK_TYPES_PREFIX {
  COMMENT_GET_ALL = "comments/getAll",
  COMMENT_CREATE = "comments/create",
}

export const getComments = createAsyncThunk<
  CommentType[],
  number,
  { rejectValue: RejectValue }
>(
  COMMENT_THUNK_TYPES_PREFIX.COMMENT_GET_ALL,
  async (id, { rejectWithValue }) => {
    try {
      return await CommentService.getComments(id);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  }
);

// export const getUserComments = createAsyncThunk<
//   CommentType[],
//   void,
//   { rejectValue: RejectValue }
// >(
//   COMMENT_THUNK_TYPES_PREFIX.COMMENT_GET_ALL,
//   async (_, { rejectWithValue }) => {
//     try {
//       return await CommentService.getUserComments();
//     } catch (error) {
//       const err = error as AxiosError<{ message: string }>;

//       return rejectWithValue({
//         message: err.response?.data.message || err.message,
//       });
//     }
//   }
// );

export const createComment = createAsyncThunk<
  CommentType,
  { ticketId: number; text: string },
  { rejectValue: RejectValue }
>(
  COMMENT_THUNK_TYPES_PREFIX.COMMENT_CREATE,
  async ({ ticketId, text }, { rejectWithValue }) => {
    try {
      return await CommentService.createComment({ ticketId, text });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  }
);
