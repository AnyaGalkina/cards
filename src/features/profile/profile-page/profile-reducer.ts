import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, UpdateUserType, UserType} from "../../auth/authAPI";
import {setAppErrorAC, setAppStatusAC} from "../../../app/app-reducer";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../../auth/sign-in/login-reducer";
import {AppRootState} from "../../../app/store";
import {AxiosError} from "axios";
import {errorUtils} from "../../../utils/errorUtils";

const initialState: UserType = {
    _id: '',
    email: '',
    name: '',
    avatar: null,
    publicCardPacksCount: 0,
    created: '',
    updated: '',
    isAdmin: false,
    verified: false,
    rememberMe: false,
    __v: 0,
    token: '',
    tokenDeathTime: 0
};

const slice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        updateUserAC(state, action: PayloadAction<UpdateUserType>) {
            state = {...state, ...action.payload}
        }
    }
})

export const profileReducer = slice.reducer
export const {updateUserAC} = slice.actions

export const updateUserTC = (userData: UpdateUserType) => async (dispatch: Dispatch, getState: () => AppRootState) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))

        const name = getState().profile.name
        const avatar = getState().profile.avatar

        let res = await authAPI.updateUser({...userData, name, avatar})
        updateUserAC(res.data.updatedUser)
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e) {
        errorUtils(e as Error | AxiosError<{ error: string }>, dispatch)
        dispatch(setAppStatusAC({status: 'failed'}))
    }
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then((res) => {
           // if (res.data.info)
            dispatch(setIsLoggedInAC({value: false}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((error) => {
            dispatch(setAppErrorAC(error))
            dispatch(setAppStatusAC({status: 'failed'}))
        })
}





