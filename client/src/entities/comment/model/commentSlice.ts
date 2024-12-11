import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getComments, createComment} from "./commentThunk";
import { CommentType } from "@/entities/comment/model";


interface CommentState {
  comments: CommentType[]; 
  loading: boolean; 
  error: string | null; 
}


const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};


const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getComments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getComments.fulfilled, (state, action: PayloadAction<CommentType[]>) => {
      state.loading = false;
      state.comments = action.payload;
    });
    builder.addCase(getComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to fetch comments";
    });
    // builder.addCase(getUserComments.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(getUserComments.fulfilled, (state, action: PayloadAction<CommentType[]>) => {
    //   state.loading = false;

      
    //   state.comments = action.payload;
    // });
    // builder.addCase(getUserComments.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload?.message || "Failed to fetch comments";
    // });


    builder.addCase(createComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createComment.fulfilled, (state, action: PayloadAction<CommentType>) => {
      state.loading = false;
      state.comments.push(action.payload); 
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to create comment";
    });
  },
});


export default commentSlice.reducer;