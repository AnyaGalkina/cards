import {Dispatch} from "redux";
import {setAppStatusAC} from "../../../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {errorUtils} from "../../../utils/errorUtils";
import {setUserAC} from "../../profile/profile-page/profile-reducer";
import {authAPI, LoginRequestType} from "../authAPI";

const initialState = {
    isLoggedIn: false
};

const slice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
});

export const loginReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions;

//Thunk

export const loginTC = (data: LoginRequestType) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
                console.log(res.data)
                dispatch(setAppStatusAC({status: 'succeeded'}));
                dispatch(setIsLoggedInAC({value: true}));
                //@ts-ignore
                dispatch(setUserAC(res.data))
            }
        )
        .catch(err => errorUtils(err, dispatch)
        )
};



