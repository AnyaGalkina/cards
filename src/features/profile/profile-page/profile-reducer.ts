import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, UpdateUserType, UserType} from "../../auth/authAPI";
import {setAppStatusAC} from "../../../app/app-reducer";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../../auth/sign-in/login-reducer";
import {AppRootState} from "../../../app/store";
import {AxiosError} from "axios";
import {errorUtils} from "../../../common/utils/errorUtils";


const initialState = {
    user: {
        _id: '',
        email: '',
        name: '',
        avatar: ''
    } as UserType
}


const slice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setUserAC(state, action: PayloadAction<UserType>) {
            state.user = action.payload
        },
        updateUserAC(state, action: PayloadAction<UpdateUserType>) {
            state.user = {...state.user, ...action.payload}
        }
    }
})

export const profileReducer = slice.reducer
export const {updateUserAC, setUserAC} = slice.actions

export const updateUserTC = (userData: UpdateUserType) => async (dispatch: Dispatch, getState: () => AppRootState) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))

        const name = getState().profile.user.name
        const avatar = getState().profile.user.avatar


        let res = await authAPI.updateUser({name, avatar, ...userData})

        dispatch(updateUserAC(res.data.updatedUser))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e) {
        errorUtils(e as Error | AxiosError<{ error: string }>, dispatch)
        dispatch(setAppStatusAC({status: 'failed'}))
    }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        await authAPI.logout()
        dispatch(setIsLoggedInAC({value: false}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e) {
        errorUtils(e as Error | AxiosError<{ error: string }>, dispatch)
        dispatch(setAppStatusAC({status: 'failed'}))
    }
}






