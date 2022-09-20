import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppErrorAC, setAppStatusAC} from "../../../app/app-reducer";
import {authAPI} from "../authAPI";
import {setIsSignedUp} from "../sign-up/sign-up-reducer";

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
    dispatch(setAppStatusAC("loading"));
    try {
        const response = await authAPI.forgotPassword(payload);
        dispatch(setRecoveryPassword({isRecoveryPasswordAsked: true}));
        dispatch(setAppStatusAC("succeeded"));
        // dispatch(setAppErrorAC(null));
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ", more details in the console");
        dispatch(setAppErrorAC(error));
        dispatch(setAppStatusAC("failed"));
    }
}

export const setNewPasswordTC = (payload: {password: string, resetPasswordToken: string}) => async (dispatch: any) => {
    dispatch(setAppStatusAC("loading"));
    try {
        const response = await authAPI.setNewPassword(payload);
        dispatch(setIsSignedUp({isSignedUp: true}));
        dispatch(setAppStatusAC("succeeded"));
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ", more details in the console");
        dispatch(setAppErrorAC(error));
        dispatch(setAppStatusAC("failed"));
    }
}