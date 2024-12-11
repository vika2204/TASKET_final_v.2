import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Project, ProjectList} from ".";
import { createNewProject, getAllProjects } from "./ProjectThunk";


type ProjectState = {
  projectList: ProjectList;
  currentProject: Project;
  error: string | null;
  loading: boolean;
};

const initialState: ProjectState = {
  projectList: [],
  currentProject: {id: 1, title: 'Tasket', code: 'TASKET'} as Project,
  error: null,
  loading: false,
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSelectedProject(state, action: PayloadAction<Project>) {
      state.currentProject = action.payload;
    }
  },
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
