import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {packsAPI, PacksType} from "./packsAPI";
import {errorUtils} from "../../common/utils/errorUtils";
import {AppRootState} from "../../app/store";

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
        userId: "",
        page: 1,
        pageCount: 5,
        isMyPack: defaultFilterValues.isMyPack,
        min: defaultFilterValues.min,
        max: defaultFilterValues.max,
        search: defaultFilterValues.search,
        totalCount: 10
    },
    packs: [
        {
            name: "",
            cardsCount: 0,
            user_name: "",
            private: false,
            created: ""
        } as PacksType
    ]
}

const slice = createSlice({
    name: "packs",
    initialState,
    reducers: {
        getUserId(state, action: PayloadAction<{ userId: string }>) {
            state.params.userId = action.payload.userId
        },
        setPacks(state, action: PayloadAction<Array<PacksType>>) {
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
        setTotalCount(state, action: PayloadAction<{ totalCount: number }>) {
            state.params.totalCount = action.payload.totalCount
        }
    }
});

export const packsReducer = slice.reducer;
export const {
    getUserId,
    setPacks,
    removeAllFilters,
    setPageCount,
    searchByPackName,
    setOwner,
    setMaxValue,
    setMinValue,
    setPage,
    setTotalCount
} = slice.actions;

//Thunk
// export const getPacksTC = (page: number, pageCount: number, userId: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({status: "loading"}))
//     packsAPI.getPacks(page, pageCount, userId)
//         .then(res => {
//                 dispatch(setAppStatusAC({status: "succeeded"}));
//                 dispatch(setPacks(res.data.cardPacks))
//                 dispatch(setTotalCount({totalCount: res.data.cardPacksTotalCount}))
//             }
//         )
//         .catch(err => errorUtils(err, dispatch))
// }


export type PackParamsType = {
    pageCount?: number;
    page?: number;
    min?: number;
    max?: number;
    userId?: string;
    search?: string
}

export const getPacksTC = () => async (dispatch: Dispatch, getState: () => AppRootState) => {

    const {userId, pageCount, page, isMyPack, min, max, search} = getState().packs.params
    let params: PackParamsType = {pageCount, page, min, max};

    if (isMyPack) {
        params = {...params, userId}
    }
    if (search) {
        params = {...params, search}
    }

    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await packsAPI.getPacks(params);
        // const res = await packsAPI.getPacks({pageCount, page, userId, min, max, search});
        dispatch(setPacks(res.data.cardPacks))
        dispatch(setAppStatusAC({status: "succeeded"}));
    } catch (err: any) {
        errorUtils(err, dispatch);
    }
}