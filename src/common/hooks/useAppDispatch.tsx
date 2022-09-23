import {useDispatch} from "react-redux";
import {store} from "../../app/store";

//export type AppDispatch = ThunkDispatch<AppRootState, unknown, ActionsType>;
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;