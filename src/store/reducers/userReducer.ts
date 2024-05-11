import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  user: User | null;
  status: "idle" | "loading" | "success" | "error";
  error: string;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.status = "success";
    },
    removeUser(state) {
      state.user = null;
      state.status = "idle";
    },
  },
});

export const getUser = (state: RootState) => state.user.user;
export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
