import {createSlice} from "@reduxjs/toolkit";
import { ProjectList } from ".";
import { createNewProject, getAllProjects } from "./ProjectThunk";


type ProjectState = {
  projectList: ProjectList;
  error: string | null;
  loading: boolean;
};

const initialState: ProjectState = {
  projectList: [],
  error: null,
  loading: false,
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewProject.fulfilled, (state, action) => {
        state.projectList = [...state.projectList, action.payload];
        state.loading = false;
        state.error = null;
      })
      .addCase(createNewProject.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.projectList = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllProjects.rejected, (state) => {
        state.loading = false;
      })
  },
});

export const projectReducer = projectSlice.reducer;
