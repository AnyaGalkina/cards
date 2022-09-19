import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {profileReducer} from "../features/profile/profile-page/profile-reducer";
import {authReducer} from "../features/auth/auth-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {signUpReducer} from "../features/auth/sign-up/sign-up-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    auth: authReducer,
    app:  appReducer,
    profile: profileReducer,
    signUp: signUpReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>;

// export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
    devTools: true
})