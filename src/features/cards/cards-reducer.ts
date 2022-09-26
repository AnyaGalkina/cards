import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardQueryParamsType, cardsAPI, ResGetCardsType} from "./cardsAPI";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {errorUtils} from "../../common/utils/errorUtils";
import {AxiosError} from "axios";

const initialState: ResGetCardsType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 0,
    pageCount: 0,
    packUserId: ''
}


const slice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {
        setCardsAC(state, action: PayloadAction<ResGetCardsType>) {
            state.cards = action.payload.cards
        }
    }
})

export const cardsReducer = slice.reducer
export const {setCardsAC} = slice.actions

export const getCardsTC = (params: CardQueryParamsType ) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))

        let res = await cardsAPI.getCards(params)
        dispatch(setCardsAC(res.data.data))

        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e) {
        errorUtils(e as Error | AxiosError<{ error: string }>, dispatch)
        dispatch(setAppStatusAC({status: 'failed'}))
    }
}