import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {packsAPI, RequestPacksType} from "./packsAPI";
import {errorUtils} from "../../common/utils/errorUtils";

const initialState = {
    params: {
        userId: '',
        page: 1,
        pageCount: 5
    },
    packs: [
        {
            name: '',
            cardsCount: 0,
            private: false,
            created: ''
        } as RequestPacksType
    ]
}

const slice = createSlice({
    name: "packs",
    initialState,
    reducers: {
        getUserId(state, action: PayloadAction<{ userId: string }>) {
            state.params.userId = action.payload.userId
        },
        getPacks(state, action: PayloadAction<Array<RequestPacksType>>) {
            state.packs = action.payload
        }
    }
});

export const packsReducer = slice.reducer;
export const {getUserId, getPacks} = slice.actions;

//Thunk
export const getPacksTC = (page: number, countPage: number, userId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    packsAPI.getPacks(page, countPage, userId)
        .then(res => {
                dispatch(setAppStatusAC({status: "succeeded"}));
                dispatch(getPacks(res.data.cardPacks))
            }
        )
        .catch(err => errorUtils(err, dispatch))
}