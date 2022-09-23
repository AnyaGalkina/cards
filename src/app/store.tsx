import {combineReducers} from "redux";
import {profileReducer} from "../features/profile/profile-page/profile-reducer";
import {appReducer} from "./app-reducer";
import {loginReducer} from "../features/auth/sign-in/login-reducer";
import thunk from "redux-thunk";
import {signUpReducer} from "../features/auth/sign-up/sign-up-reducer";
import {recoveryPasswordReducer} from "../features/auth/forgot-password/recovery-password-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    app:  appReducer,
    login: loginReducer,
    profile: profileReducer,
    signUp: signUpReducer,
    recoveryPassword: recoveryPasswordReducer,
})

//export type AppRootState = ReturnType<typeof rootReducer>;
export type AppRootState = ReturnType<typeof store.getState>

// export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
    devTools: true
})


