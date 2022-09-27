import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {packsAPI, RequestPacksType} from "./packsAPI";
import {errorUtils} from "../../common/utils/errorUtils";

export const defaultFilterValues = {
    min: 0,
    //Data from server?
    max: 10,
    isMyPack: false,
    search: ""
}

type DefaultFilterValues = typeof defaultFilterValues;

const initialState = {
    params: {
        userId: '',
        page: 1,
        pageCount: 5,
        isMyPack: defaultFilterValues.isMyPack,
        min: defaultFilterValues.min,
        max: defaultFilterValues.max,
        search: defaultFilterValues.search
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
        },
        removeAllFilters: (state, action: PayloadAction<DefaultFilterValues>) => {
            state.params.min = action.payload.min;
            state.params.max = action.payload.max;
            state.params.isMyPack = action.payload.isMyPack;
            state.params.search = action.payload.search
        },
        setMinValue: (state, action: PayloadAction<{ min: number }>) => {
            state.params.min = action.payload.min
        },
        setMaxValue: (state, action: PayloadAction<{ max: number }>) => {
            state.params.max = action.payload.max
        },
        setOwner: (state, action: PayloadAction<{ isMyPack: boolean }>) => {
            state.params.isMyPack = action.payload.isMyPack
        },
        setPage: (state, action: PayloadAction<{ page: number }>) => {
            state.params.page = action.payload.page
        },
        setPageCount: (state, action: PayloadAction<{ pageCount: number }>) => {
            state.params.pageCount = action.payload.pageCount
        },
        searchByPackName: (state, action: PayloadAction<{ search: string }>) => {
            state.params.search = action.payload.search
        },

    }
});

export const packsReducer = slice.reducer;
export const {getUserId, getPacks, removeAllFilters, setPageCount, searchByPackName, setOwner,  setMaxValue, setMinValue, setPage} = slice.actions;

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