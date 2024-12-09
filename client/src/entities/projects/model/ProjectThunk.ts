import { createAsyncThunk } from "@reduxjs/toolkit";
import { Project, ProjectList } from ".";
import { ProjectService } from "../api";
import { AxiosError } from "axios";




type rejectValue = {
  message: string;
};


export const getAllProjects = createAsyncThunk<
ProjectList,
void,
{rejectValue: rejectValue }
>("get/projects", async (_,{ rejectWithValue })=>{
  try {
    return await ProjectService.getAllProjects()
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
})


export const createNewProject = createAsyncThunk<
Project,
{title:string,code:string},
{rejectValue: rejectValue }
>("create/project", async({title,code},{ rejectWithValue })=>{
  try {
    return await ProjectService.createNewProject(title,code)
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
})