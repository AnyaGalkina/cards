import {Dispatch} from "redux";
import {loginAPI, LoginRequestType} from "./login-api";
import {setAppStatusAC, SetAppStatusActionType} from "../../../app/app-reducer";
import {handleServerNetworkError} from "../../../common/utils/error";

const initialState = {
    isLoggedIn: false
};


export const loginReducer = (state: LoginStateType = initialState, action: LoginActionTypes): LoginStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// Actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//Thunk

export const loginTC = (data: LoginRequestType) => (dispatch: Dispatch<LoginActionTypes>) => {
    dispatch(setAppStatusAC('loading'))
    loginAPI.login(data)
        .then(res => {
                console.log(res)
                dispatch(setAppStatusAC('succeeded'));
                dispatch(setIsLoggedInAC(true))
            }
        )
        .catch(err => handleServerNetworkError(err, dispatch)
        )
};

//Types
type LoginStateType = typeof initialState;
export type LoginActionTypes = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType



