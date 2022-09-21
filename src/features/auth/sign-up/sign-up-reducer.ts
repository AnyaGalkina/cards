import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../authAPI";
import {setAppStatusAC} from "../../../app/app-reducer";
import {errorUtils} from "../../../utils/errorUtils";

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

export type SignUpPayloadType = {
    email: string;
    password: string;
}

export const signUpTC = (payload: SignUpPayloadType) => async (dispatch: any) => {
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



