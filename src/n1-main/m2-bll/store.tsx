import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {authReducer} from "./auth-reducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer
})

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));