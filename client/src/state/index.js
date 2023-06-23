import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    courses: [],
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            },
            setLogin: (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
            },
            setLogout: (state) => {
                state.user = null;
                state.token = null;
            },
            setCourses: (state, action) => {
                state.courses = action.payload.courses;
            }
    }
})

export const { setMode, setLogin, setLogout, setCourses} = authSlice.actions;
export default authSlice.reducer;