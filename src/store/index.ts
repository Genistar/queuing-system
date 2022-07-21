import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from 'react-redux'
import userReducer from '../features/SystemSetting/Account/userSlice';
import deviceReducer from "../features/Devices/deviceSlice";
import serviceReducer from "../features/Service/serviceSlice";
import giveNumberReducer from "../features/GiveNumber/giveNumberSlice";
import diaryReducer from "../features/SystemSetting/DairyUser/diarySlice";
import roleReducer from "../features/SystemSetting/Role/roleSlice";

const store = configureStore({
    reducer: {
        userReducer,
        deviceReducer,
        serviceReducer,
        giveNumberReducer,
        diaryReducer,
        roleReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store