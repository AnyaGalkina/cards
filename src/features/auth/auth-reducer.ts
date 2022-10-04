import {authAPI, LoginRequestType} from "./authAPI";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SignUpType} from "./authAPI";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {errorUtils} from "../../common/utils/errorUtils";
import {setUserAC} from "../profile/profile-page/profile-reducer";
import {setUserId} from "../packs/packs-reducer";

const initialState = {
    isLoggedIn: false,
    isSignedUp: false,
    isRecoveryPasswordAsked: false,
    email: "",
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoggedInAC: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isLoggedIn = action.payload.value
        },
        setIsSignedUp: (state, action: PayloadAction<{ isSignedUp: boolean }>) => {
            state.isSignedUp = action.payload.isSignedUp;
        },
        setRecoveryPassword: (state, action: PayloadAction<{ isRecoveryPasswordAsked: boolean }>) => {
            state.isRecoveryPasswordAsked = action.payload.isRecoveryPasswordAsked
        },
        setEmail: (state, action: PayloadAction<{ email: string }>) => {
            state.email = action.payload.email
        }
    }
});

export const authReducer = slice.reducer;
export const {setIsLoggedInAC, setIsSignedUp, setRecoveryPassword, setEmail} = slice.actions;

//Thunks

export const loginTC = (data: LoginRequestType) => async (dispatch: Dispatch<any>) => {
        dispatch(setAppStatusAC({status: "loading"}))
        try {
            const res = await authAPI.login(data)
            dispatch(setIsLoggedInAC({value: true}));
            dispatch(setUserAC(res.data))
            dispatch(setUserId({userId: res.data._id}))
        } catch (err: any) {
            errorUtils(err, dispatch);
        } finally {
            dispatch(setAppStatusAC({status: "succeeded"}));
        }
    }
;

export const signUpTC = (payload: SignUpType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}));
    try {
        const res = await authAPI.signUp(payload);
        dispatch(setIsSignedUp({isSignedUp: true}));
    } catch (err: any) {
        errorUtils(err, dispatch);
    } finally {
        dispatch(setAppStatusAC({status: "succeeded"}));
    }
}

export const forgotPasswordTC = (payload: { email: string }) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}));
    try {
        const res = await authAPI.forgotPassword(payload);
        dispatch(setRecoveryPassword({isRecoveryPasswordAsked: true}));
        dispatch(setEmail({email: payload.email}));
    } catch (err: any) {
        errorUtils(err, dispatch);
    } finally {
        dispatch(setAppStatusAC({status: "succeeded"}));
    }
}

export const setNewPasswordTC = (payload: { password: string, resetPasswordToken: string }) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}));
    try {
        const res = await authAPI.setNewPassword(payload);
        dispatch(setIsSignedUp({isSignedUp: true}));
    } catch (err: any) {
        errorUtils(err, dispatch);
    } finally {
        dispatch(setAppStatusAC({status: "succeeded"}));
    }
}