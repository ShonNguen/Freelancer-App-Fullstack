import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "../service/auth.service";

const user = JSON.parse(localStorage.getItem("user")); 

const initialState = {
    user: user ? user : null, 
    isError: false, 
    isSuccess: false, 
    isLoading: false, 
    message: ''
};

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (user, thunkAPI) => {
        try {
            const response = await AuthService.signUp(user);
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }, thunkAPI) => {
        try {
            const data = await AuthService.login(username, password);
            return { user: data };
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        await AuthService.logout();
    });



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false; 
            state.isSuccess = false; 
            state.isError = false; 
            state.message = ''; 
        }
    },
    extraReducers: {
        [signUp.pending]: (state, action) => {
            state.isLoading = true; 
        },
        [signUp.fulfilled]: (state, action) => {
            state.isLoading = false; 
            state.isSuccess = true; 
            state.user = action.payload;  
        },
        [signUp.rejected]: (state, action) => {
            state.isLoading = false; 
            state.isError = true; 
            state.message = action.payload;
            state.user = null;
        },
        [login.pending]: (state, action) => {
            state.isLoading = true;  
        },
        [login.fulfilled]: (state, action) => {
            state.isLoading = false; 
            state.isSuccess = true; 
            state.user = action.payload;
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false; 
            state.isError = true; 
            state.message = action.payload;
            state.user = null;
        },
        [logout.fulfilled]: (state, action) => {
            state.user = null;
        },
    },
});

const { reducer } = authSlice;

export const {reset} = authSlice.actions; 
export default reducer;