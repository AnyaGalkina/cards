import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {profileReducer} from "../features/profile/profile-page/profile-reducer";
import {authReducer} from "../features/auth/auth-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    app:  appReducer,
    profile: profileReducer
})

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));