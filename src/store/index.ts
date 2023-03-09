import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainSlice from "./slices/mainSlice";
import calculatorSlice from "./slices/calculatorSlice";

const mainReducer = combineReducers({
  mainSlice,
  calculatorSlice,
});

export const store = configureStore({
  reducer: mainReducer,
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
