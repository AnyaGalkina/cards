import {combineReducers} from "redux";
import {profileReducer} from "../features/profile/profile-page/profile-reducer";
import {appReducer} from "./app-reducer";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../features/auth/auth-reducer";
import {cardsReducer} from "../features/cards/cards-reducer";
import {packsReducer} from "../features/packs/packs-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    cards: cardsReducer,
    packs: packsReducer
})

//export type AppRootState = ReturnType<typeof rootReducer>;
export type AppRootState = ReturnType<typeof store.getState>

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
    devTools: true
})


