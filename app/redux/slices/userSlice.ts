import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserInfo from "../../interfaces/UserInfo";

interface UserState {
    userInfo: UserInfo | null;
}

const initialState: UserState = {
    userInfo: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;
        },
        clearUser: (state) => {
            state.userInfo = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;