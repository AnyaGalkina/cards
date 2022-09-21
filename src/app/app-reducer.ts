import {Dispatch} from "redux";
import {loginAPI} from "../features/auth/sign-in/login-api";
import {setIsLoggedInAC} from "../features/auth/sign-in/login-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setRecoveryPassword} from "../features/auth/forgot-password/recovery-password-reducer";

const initialState: initialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        }
    }
})

//Reducer
export const appReducer = slice.reducer;

// Action creators
export const {setAppErrorAC, setAppStatusAC, setAppIsInitializedAC} = slice.actions;

// Thunk creators
export const initializeAppTC = () => (dispatch: Dispatch) => {
    loginAPI.me().then(res => {
        if (res.status === 200) {
            dispatch(setIsLoggedInAC({value: true}));
            dispatch(setAppIsInitializedAC({isInitialized: true}));
        } else {
        }
    })
};

//Types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type initialStateType = {
    status: RequestStatusType
    error: null | string
    isInitialized: boolean
}
export type ActionsType =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppIsInitializedAC>
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setRecoveryPassword>

