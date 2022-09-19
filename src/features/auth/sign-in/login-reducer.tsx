import {Dispatch} from "redux";
import {loginAPI, LoginRequestType} from "./login-api";
import {setAppStatusAC} from "../../../app/app-reducer";

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

export const loginTC = (data: LoginRequestType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    loginAPI.login(data)
        .then(res => {
                dispatch(setAppStatusAC('succeeded'));
                dispatch(setIsLoggedInAC(true))
            }
        )
        .catch(err => alert(err))
}

//Types
type LoginStateType = typeof initialState;
type LoginActionTypes = ReturnType<typeof setIsLoggedInAC>


