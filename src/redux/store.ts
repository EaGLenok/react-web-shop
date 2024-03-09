import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./slices/itemSlice";
// ...

export const store = configureStore({
  reducer: {
    product: itemsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
