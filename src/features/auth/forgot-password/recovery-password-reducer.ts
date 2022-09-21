import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../../app/app-reducer";
import {authAPI} from "../authAPI";
import {setIsSignedUp} from "../sign-up/sign-up-reducer";
import {errorUtils} from "../../../utils/errorUtils";

const initialState = {
    isRecoveryPasswordAsked: false
};

export type InitialStateType = typeof initialState;

const slice = createSlice({
    name: "recoveryPassword",
    initialState,
    reducers: {
        setRecoveryPassword: (state: InitialStateType, action: PayloadAction<{ isRecoveryPasswordAsked: boolean }>) => {
            state.isRecoveryPasswordAsked = action.payload.isRecoveryPasswordAsked
        }
    }
});

export const recoveryPasswordReducer = slice.reducer;
export const {setRecoveryPassword} = slice.actions;


export const forgotPasswordTC = (payload: { email: string }) => async (dispatch: any) => {
    dispatch(setAppStatusAC({status: "loading"}));
    try {
        const response = await authAPI.forgotPassword(payload);
        dispatch(setRecoveryPassword({isRecoveryPasswordAsked: true}));
        dispatch(setAppStatusAC({status: "succeeded"}));
    } catch (err: any) {
        errorUtils(err, dispatch);
    }
}

export const setNewPasswordTC = (payload: { password: string, resetPasswordToken: string }) => async (dispatch: any) => {
    dispatch(setAppStatusAC({status: "loading"}));
    try {
        const response = await authAPI.setNewPassword(payload);
        dispatch(setIsSignedUp({isSignedUp: true}));
        dispatch(setAppStatusAC({status: "succeeded"}));
    } catch (err: any) {
        errorUtils(err, dispatch);
    }
}