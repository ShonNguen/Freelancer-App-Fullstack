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

export const getAllJobs = createAsyncThunk(
    'jobs/getAll',
    async (_, thunkAPI) => {
        try {
            return await jobService.getAllJobs();
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

export const getUserJobs = createAsyncThunk(
    'jobs/getUsers',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await jobService.getUserJobs(token);
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

export const postNewJob = createAsyncThunk(
    'jobs/create',
    async (jobData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await jobService.postNewJob(jobData, token);
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

export const updateJob = createAsyncThunk(
    'jobs/update',
    async (id, jobData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await jobService.updateJob(id, jobData, token);
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

export const deleteJob = createAsyncThunk(
    'jobs/deleteJob',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await jobService.postNewJob(id, token);
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
        [getAllJobs.pending]: (state, action) => {
            state.isLoading = true; 
        },
        [getAllJobs.fulfilled]: (state, action) => {
            state.isLoading = false; 
            state.isSuccess = true; 
            state.allJobs = action.payload; 
        },
        [getAllJobs.rejected]: (state, action) => {
            state.isLoading = false; 
            state.isError = true; 
            state.message = action.payload; 
        },
        [getUserJobs.pending]: (state, action) => {
            state.isLoading = true; 
        },
        [getUserJobs.fulfilled]: (state, action) => {
            state.isLoading = false; 
            state.isSuccess = true; 
            state.userJobs = action.payload; 
        },
        [getUserJobs.rejected]: (state, action) => {
            state.isLoading = false; 
            state.isError = true; 
            state.message = action.payload; 
        },
        [postNewJob.pending]: (state, action) => {
            state.isLoading = true; 
        },
        [postNewJob.fulfilled]: (state, action) => {
            state.isLoading = false; 
            state.isSuccess = true; 
            state.userJobs.push(action.payload); 
        },
        [postNewJob.rejected]: (state, action) => {
            state.isLoading = false; 
            state.isError = true; 
            state.message = action.payload; 
        },
        [deleteJob.pending]: (state, action) => {
            state.isLoading = true; 
        },
        [deleteJob.fulfilled]: (state, action) => {
            state.isLoading = false; 
            state.isSuccess = true; 
            state.userJobs = state.userJobs.filter(
                (job) => {
                    job.id !== action.payload.id; 
                }
            ); 
        },
        [deleteJob.rejected]: (state, action) => {
            state.isLoading = false; 
            state.isError = true; 
            state.message = action.payload; 
        },
        [updateJob.pending]: (state, action) => {
            state.isLoading = true; 
        }, 
        [updateJob.fulfilled]: (state, action) => {
            state.isLoading = false; 
            state.isSuccess = true; 
            state.userJobs.map(
                (job) => {
                    if(job.id === action.payload.id) {
                        job = action.payload; 
                    }
                }
            );
        },
        [updateJob.rejected]: (state, action) => {
            state.isLoading = false; 
            state.isError = true; 
            state.message = action.payload; 
        }
    },
});

const { reducer } = jobSlice; 

export const { reset } = jobSlice.actions;
export default reducer; 