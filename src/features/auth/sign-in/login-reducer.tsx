import {Dispatch} from "redux";
import {loginAPI, LoginRequestType} from "./login-api";
import {setAppStatusAC} from "../../../app/app-reducer";
import {handleServerNetworkError} from "../../../common/utils/error";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
};

const slice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = action.payload.value
        }
    }
});

export const loginReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions;

//Thunk

export const loginTC = (data: LoginRequestType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    loginAPI.login(data)
        .then(res => {
                console.log(res)
                dispatch(setAppStatusAC({status: 'succeeded'}));
                dispatch(setIsLoggedInAC({value: true}))
            }
        )
        .catch(err => handleServerNetworkError(err, dispatch)
        )
};



