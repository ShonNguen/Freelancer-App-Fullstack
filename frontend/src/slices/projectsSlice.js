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
    'projects/create',
    async (projectData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await projectService.postNewProject(projectData, token);
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

export const getAllProjects = createAsyncThunk(
    'project/getAll',
    async (_, thunkAPI) => {
        try {
            return await projectService.getAllProjects();
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

// export const getImage = createAsyncThunk(
//     'project/getImage',
//     async (filename, thunkAPI) => {
//         try {
//             return await projectService.getImage(filename);
//         } catch (error) {
//             const message = (error.response &&
//                 error.response.data &&
//                 error.response.data.message) ||
//                 error.message ||
//                 error.toString()
//             return thunkAPI.rejectWithValue(message)
//         }
//     }
// )

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
        resetProjects: (state) => {
            state.allProjects = [];
            state.userProjects = [];
        }
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
        [getAllProjects.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getAllProjects.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.allProjects = action.payload;
        },
        [getAllProjects.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        },
    }
});

const { reducer } = projectSlice;

export const { reset, resetProjects } = projectSlice.actions;
export default reducer; 