import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = { isAuthenticated: false, userName: "" };

const authSlice = createSlice(
    {
        name: 'authentication',
        initialState: initialAuthState,
        reducers: {
            loginSuccessful(state, action) {
                state.isAuthenticated = true;
                state.userName = action.payload.userName;
            },
            logout(state) {
                state.isAuthenticated = false;
                state.userName = "";
            }
        }
    }
);

export default authSlice;
