import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import postReducer from "./posts/postReducer";

export const store = configureStore({
  reducer: {
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
