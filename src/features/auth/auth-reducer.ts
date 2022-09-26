import {authAPI, LoginRequestType} from "./authAPI";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SignUpType} from "./authAPI";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {errorUtils} from "../../common/utils/errorUtils";
import {setUserAC} from "../profile/profile-page/profile-reducer";
import {getUserId} from "../packs/packs-reducer";

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
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
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

export const loginTC = (data: LoginRequestType) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC({status: "loading"}))
    authAPI.login(data)
        .then(res => {
                dispatch(setAppStatusAC({status: "succeeded"}));
                dispatch(setIsLoggedInAC({value: true}));
                dispatch(setUserAC(res.data))
                dispatch(getUserId({userId: res.data._id}))
            }
        )
        .catch(err => errorUtils(err, dispatch)
        )
};

export const signUpTC = (payload: SignUpType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}));
    try {
        const response = await authAPI.signUp(payload);
        dispatch(setIsSignedUp({isSignedUp: true}));
        dispatch(setAppStatusAC({status: "succeeded"}));
    } catch (err: any) {
        errorUtils(err, dispatch);
    }
}

export const forgotPasswordTC = (payload: { email: string }) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}));
    try {
        const response = await authAPI.forgotPassword(payload);
        dispatch(setRecoveryPassword({isRecoveryPasswordAsked: true}));
        dispatch(setEmail({email: payload.email}));
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