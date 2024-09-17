import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the user object (adjust the properties as needed)
export interface User {
  _id: string;
  name: string;
  bio: string;
  username: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
}

// Update the AuthState interface to use the User type
interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loader: boolean;
}

// Initial state with type safety
const initialState: AuthState = {
  user: null,
  isAdmin: false,
  loader: true,
};

// Define the auth slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExists: (state) => {
      state.user = null;
      state.loader = false;
    },
  },
});

// Export actions to be used in components
export const { userExists, userNotExists } = authSlice.actions;

// Selector to access the auth state
export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
