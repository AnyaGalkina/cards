import {ThunkDispatch} from "redux-thunk";
import {ActionsType} from "../../app/app-reducer";
import {useDispatch} from "react-redux";
import {AppRootState} from "../../app/store";

export type AppDispatch = ThunkDispatch<AppRootState, unknown, ActionsType>;

export const useAppDispatch: () => AppDispatch = useDispatch;