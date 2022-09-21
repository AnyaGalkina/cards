import {Dispatch} from 'redux'
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";


export const handleServerNetworkError = (error: AxiosError, dispatch: Dispatch) => {
    dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}