import {Dispatch} from 'redux'
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {AxiosError, AxiosResponse} from "axios";
import {LoginErrorResponseType} from "../../features/auth/sign-in/login-api";

export const handleServerAppError = <T>(data: AxiosResponse<LoginErrorResponseType>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    if (data.data.error) {
        dispatch(setAppErrorAC(data.data.error))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: AxiosError, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}