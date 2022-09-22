import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";

export const errorUtils = (e: Error | AxiosError<{error: string}>, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
        dispatch(setAppErrorAC({error: error}))
    } else {
        dispatch(setAppErrorAC({error: `Native error ${err.message}`
    }))
    }
    dispatch(setAppStatusAC({status: 'failed'}));
}