import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, SignUpType} from "../authAPI";
import {setAppStatusAC} from "../../../app/app-reducer";
import {errorUtils} from "../../../common/utils/errorUtils";
import {Dispatch} from "redux";

const initialState = {
    isSignedUp: false
};

export type InitialStateType = typeof initialState;

const slice = createSlice({
    name: "signUp",
    initialState,
    reducers: {
        setIsSignedUp: (state: InitialStateType, action: PayloadAction<{ isSignedUp: boolean }>) => {
            state.isSignedUp = action.payload.isSignedUp;
        }
    }
})

export const signUpReducer = slice.reducer;
export const {setIsSignedUp} = slice.actions;


export const signUpTC = (payload: SignUpType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}));
    try {
        const response = await authAPI.signUp(payload);
        console.log(response.data);
        dispatch(setIsSignedUp({isSignedUp: true}));
        dispatch(setAppStatusAC({status: "succeeded"}));
    } catch(err:any) {
        errorUtils(err, dispatch);
    }
}