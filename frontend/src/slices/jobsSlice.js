import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import jobService from "../service/jobs.service";

const initialState = {
    allJobs: [],
    userJobs: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

export const createJob = createAsyncThunk(
    'jobs/createNewJob',
    async (jobData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await jobService.createGoal(jobData, token)
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

export const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        reset: (state) => initialState
    }, 
    extraReducers: {
        [createJob.pending]: (state, action) => {
            state.isLoading = true; 
        },
        [createJob.fulfilled]: (state, action) => {
            state.isLoading = false; 
            state.isSuccess = true; 
            state.userJobs.push(action.payload); 
        },
        [createJob.rejected]: (state, action) => {
            state.isLoading = false; 
            state.isError = true; 
            state.message = action.payload; 
        },
    },
});

export const { reset } = jobSlice.actions;
export default jobSlice.reducer; 