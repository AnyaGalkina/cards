import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardQueryParamsType, cardsAPI, NewCardType, ResGetCardsType, UpdatedCardType} from "./cardsAPI";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {errorUtils} from "../../common/utils/errorUtils";
import {AxiosError} from "axios";
import {AppRootState} from "../../app/store";

export type SortCardsType = "0grade" | "1grade" | "";

const initialState = {
    cardsState:  {
        cards: [],
        cardsTotalCount: 0,
        maxGrade: 0,
        minGrade: 0,
        page: 0,
        pageCount: 10,
        packUserId: ''
    } as ResGetCardsType,
    params: {
        cardsPack_id: '',
        cardQuestion: '',
        cardAnswer: '',
        sortCards: '',
        page: 1,
        pageCount: 5,
        search: ""
    } as CardQueryParamsType
}


const slice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {
        setCardsAC(state, action: PayloadAction<ResGetCardsType>) {
            state.cardsState = action.payload
        },
        setSearchCards(state, action: PayloadAction<{ search: string }>) {
            state.params.search = action.payload.search
        },
        setSortCards(state, action: PayloadAction<{ sortCards: SortCardsType }>) {
            state.params.sortCards = action.payload.sortCards
        }
    }
})

export const cardsReducer = slice.reducer
export const {setCardsAC, setSearchCards, setSortCards} = slice.actions

export const getCardsTC = () => async (dispatch: Dispatch, getState: () => AppRootState) => {
    const {pageCount, page, sortCards, search, cardsPack_id} = getState().cards.params;
    const params: CardQueryParamsType = {pageCount, page, cardsPack_id};

    if (search) {
        params.cardQuestion = search;
    }

    if (sortCards) {
        params.sortCards = sortCards;
    }

    dispatch(setAppStatusAC({status: "loading"}))

    try {
        let res = await cardsAPI.getCards(params)
        console.log(res.data)

        dispatch(setCardsAC(res.data))

        dispatch(setAppStatusAC({status: "succeeded"}))
        dispatch(setAppStatusAC({status: "succeeded"}))
    } catch (e) {
        errorUtils(e as Error | AxiosError<{ error: string }>, dispatch)
        dispatch(setAppStatusAC({status: "failed"}))
    }
}

export const addCardsTC = (data: NewCardType) => async (dispatch: any) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        let res = await cardsAPI.createCard(data)

        dispatch(getCardsTC({cardsPack_id: data.card.cardsPack_id}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e) {
        errorUtils(e as Error | AxiosError<{ error: string }>, dispatch)
        dispatch(setAppStatusAC({status: 'failed'}))
    }
}

export const updateCardsTC = (data: UpdatedCardType) => async (dispatch: any) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        let res = await cardsAPI.updateCard(data)

        dispatch(getCardsTC({cardsPack_id: data.card.cardsPack_id}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e) {
        errorUtils(e as Error | AxiosError<{ error: string }>, dispatch)
        dispatch(setAppStatusAC({status: 'failed'}))
    }
}

export const deleteCardsTC = (cardId: string, cardsPack_id: string) => async (dispatch: any) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        let res = await cardsAPI.deleteCard(cardId)

        dispatch(getCardsTC({cardsPack_id}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e) {
        errorUtils(e as Error | AxiosError<{ error: string }>, dispatch)
        dispatch(setAppStatusAC({status: 'failed'}))
    }
}

// export const getCardsTC = (params: CardQueryParamsType) => async (dispatch: Dispatch) => {
//     try {
//         dispatch(setAppStatusAC({status: 'loading'}))
//
//         let res = await cardsAPI.getCards(params)
//         console.log(res.data)
//
//         dispatch(setCardsAC(res.data))
//
//         dispatch(setAppStatusAC({status: 'succeeded'}))
//     } catch (e) {
//         errorUtils(e as Error | AxiosError<{ error: string }>, dispatch)
//         dispatch(setAppStatusAC({status: 'failed'}))
//     }
// }