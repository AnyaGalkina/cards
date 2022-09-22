import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../../app/app-reducer";
import {authAPI} from "../authAPI";
import {setIsSignedUp} from "../sign-up/sign-up-reducer";
import {errorUtils} from "../../../common/utils/errorUtils";
import {Dispatch} from "redux";

const initialState = {
    isRecoveryPasswordAsked: false,
    email: "",
};

export type InitialStateType = typeof initialState;

const slice = createSlice({
    name: "recoveryPassword",
    initialState,
    reducers: {
        setRecoveryPassword: (state: InitialStateType, action: PayloadAction<{ isRecoveryPasswordAsked: boolean }>) => {
            state.isRecoveryPasswordAsked = action.payload.isRecoveryPasswordAsked
        },
        setEmail: (state: InitialStateType, action: PayloadAction<{ email: string }>) => {
            state.email = action.payload.email
        },
    }
});

export const recoveryPasswordReducer = slice.reducer;
export const {setRecoveryPassword, setEmail} = slice.actions;


export const forgotPasswordTC = (payload: { email: string }) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}));
    try {
        const response = await authAPI.forgotPassword(payload);
        dispatch(setRecoveryPassword({isRecoveryPasswordAsked: true}));
        dispatch(setEmail({ email: payload.email }))
        dispatch(setAppStatusAC({status: "succeeded"}));
    } catch (err: any) {
        errorUtils(err, dispatch);
    }
}

export const setNewPasswordTC = (payload: { password: string, resetPasswordToken: string }) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}));
    try {
        const response = await authAPI.setNewPassword(payload);
        dispatch(setIsSignedUp({isSignedUp: true}));
        dispatch(setAppStatusAC({status: "succeeded"}));
    } catch (err: any) {
        errorUtils(err, dispatch);
    }
}