import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import { authSlice } from "./reducers/auth";
import { chatSlice } from "./reducers/chat";
import { miscSlice } from "./reducers/misc";

// ...

export const store = configureStore({
  reducer: {
    misc: miscSlice.reducer,
    auth: authSlice.reducer,
    chat: chatSlice.reducer,
    api: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
