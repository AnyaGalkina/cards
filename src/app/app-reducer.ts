import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../features/auth/sign-in/login-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setRecoveryPassword} from "../features/auth/forgot-password/recovery-password-reducer";
import {errorUtils} from "../common/utils/errorUtils";
import {setUserAC} from "../features/profile/profile-page/profile-reducer";
import {authAPI} from "../features/auth/authAPI";

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
    authAPI.me().then(res => {
        console.log(res.data)
        dispatch(setIsLoggedInAC({value: true}));
        dispatch(setUserAC(res.data))
    })
        .catch(err => errorUtils(err, dispatch))
        .finally(() => {
            dispatch(setAppIsInitializedAC({isInitialized: true}));
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

