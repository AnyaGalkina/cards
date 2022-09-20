import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {profileReducer} from "../features/profile/profile-page/profile-reducer";
import {authReducer} from "../features/auth/auth-reducer";
import {appReducer} from "./app-reducer";
import {loginReducer} from "../features/auth/sign-in/login-reducer";
import thunk from "redux-thunk";
import {signUpReducer} from "../features/auth/sign-up/sign-up-reducer";
import {recoveryPasswordReducer} from "../features/auth/forgot-password/recovery-password-reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    app:  appReducer,
    login: loginReducer,
    profile: profileReducer,
    signUp: signUpReducer,
    recoveryPassword: recoveryPasswordReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
// export const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
//     devTools: true
// })