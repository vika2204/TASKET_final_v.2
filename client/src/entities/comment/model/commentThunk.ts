import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {CommentService} from "@/entities/comment/api";
import {CommentType} from "@/entities/comment/model/index.ts";

// Определяем тип RejectValue для значения rejectWithValue
type RejectValue = {
    message: string;
};

enum COMMENT_THUNK_TYPES_PREFIX {
    COMMENT_GET_ALL = 'comment/getAll',
    COMMENT_CREATE = 'comment/create',
}

export const getComments = createAsyncThunk<CommentType[], number, { rejectValue: RejectValue }>(COMMENT_THUNK_TYPES_PREFIX.COMMENT_GET_ALL, async (breedId, { rejectWithValue }) => {
    try {
        return await CommentService.getComments(breedId)
    } catch (error) {
        // Обрабатываем ошибку, приводя ее к типу AxiosError
        const err = error as AxiosError<{ message: string }>

        // Возвращаем значение rejectWithValue с сообщением об ошибке
        return rejectWithValue({
            message: err.response?.data.message || err.message
        });
    }
});

export const createComment = createAsyncThunk<CommentType, {breedId: number, text: string}, { rejectValue: RejectValue }>(COMMENT_THUNK_TYPES_PREFIX.COMMENT_CREATE, async ({breedId, text}, { rejectWithValue }) => {
    try {
        return await CommentService.createComment({breedId, text})
    } catch (error) {
        // Обрабатываем ошибку, приводя ее к типу AxiosError
        const err = error as AxiosError<{ message: string }>

        // Возвращаем значение rejectWithValue с сообщением об ошибке
        return rejectWithValue({
            message: err.response?.data.message || err.message
        });
    }
});

