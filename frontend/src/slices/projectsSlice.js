import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import projectService from '../service/projects.service';

const initialState = {
    allProjects: [],
    userProjects: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
};

export const createNewProject = createAsyncThunk(
    'projects/createProject',
    async (projectData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await projectService.postNewJob(projectData, token);
        } catch (error) {
            const message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
); 

export const projectSlice = createSlice({
    name: 'project', 
    initialState, 
    reducers: {
        reset: (state) => initialState
    }, 
    extraReducers: {
        [createNewProject.pending]: (state, action) => {
            state.isLoading = true; 
        },
        [createNewProject.fulfilled]: (state, action) => {
            state.isLoading = false; 
            state.isSuccess = true; 
            state.userProjects.push(action.payload); 
        },
        [createNewProject.rejected]: (state, action) => {
            state.isLoading = false; 
            state.isError = true; 
            state.message = action.payload; 
        },
    }
}); 

const { reducer } = projectSlice; 

export const { reset } = projectSlice.actions; 
export default reducer; 