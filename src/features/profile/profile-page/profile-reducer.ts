import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, UpdateUserType, UserType} from "../../auth/authAPI";
import {setAppStatusAC} from "../../../app/app-reducer";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../../auth/sign-in/login-reducer";
import {AppRootState} from "../../../app/store";
import {AxiosError} from "axios";
import {errorUtils} from "../../../common/utils/errorUtils";

const initialState = {
    _id: '',
    email: '',
    name: '',
    avatar: ''
} as UserType

const slice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setUserAC(state, action: PayloadAction<UserType>) {
            state.name = action.payload.name
            state.avatar = action.payload.avatar
            state._id = action.payload._id
            state.email = action.payload.email
        },
        updateUserAC(state, action: PayloadAction<UpdateUserType>) {
            state = {...state, ...action.payload}
        }
    }
})

export const profileReducer = slice.reducer
export const {updateUserAC, setUserAC} = slice.actions

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
            console.log(res)
            dispatch(setIsLoggedInAC({value: false}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((error) => {
            errorUtils(error, dispatch)
            dispatch(setAppStatusAC({status: 'failed'}))
        })
}





