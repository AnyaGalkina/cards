import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {packsAPI, PacksType} from "./packsAPI";
import {errorUtils} from "../../common/utils/errorUtils";
import {AppRootState} from "../../app/store";

export const defaultFilterValues = {
    min: 0,
    isMyPack: false,
    search: "",
    sortPacks: "0updated" as SortPacksType
}

type DefaultFilterValues = typeof defaultFilterValues;
export type SortPacksType = "0updated" | "1updated";

const initialState = {
    params: {
        userId: "",
        page: 1,
        pageCount: 5,
        isMyPack: defaultFilterValues.isMyPack,
        min: defaultFilterValues.min,
        max: 0,
        search: defaultFilterValues.search,
        totalCount: 10,
        sortPacks: defaultFilterValues.sortPacks
    },
    packs: [
        {
            name: "",
            cardsCount: 0,
            user_name: "",
            private: false,
            created: ""
        } as PacksType
    ],
    maxCardsCount: 0
}

const slice = createSlice({
    name: "packs",
    initialState,
    reducers: {
        setUserId(state, action: PayloadAction<{ userId: string }>) {
            state.params.userId = action.payload.userId
        },
        setPacks: (state, action: PayloadAction<Array<PacksType>>) => {
            state.packs = action.payload
        },
        removeAllFilters: (state, action: PayloadAction<DefaultFilterValues>) => {
            state.params.min = action.payload.min;
            state.params.max = state.maxCardsCount;
            state.params.search = action.payload.search;
            state.params.sortPacks = action.payload.sortPacks;
            state.params.isMyPack = false;
        },
        setMinValue: (state, action: PayloadAction<{ min: number }>) => {
            state.params.min = action.payload.min
        },
        setMaxValue: (state, action: PayloadAction<{ max: number }>) => {
            state.params.max = action.payload.max
        },
        setOwner: (state, action: PayloadAction<{ isMyPack: boolean }>) => {
            state.params.isMyPack = action.payload.isMyPack;
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
        setTotalCount: (state, action: PayloadAction<{ totalCount: number }>) => {
            state.params.totalCount = action.payload.totalCount
        },
        setSortPacksByDate: (state, action: PayloadAction<{ sortPacks: SortPacksType }>) => {
            state.params.sortPacks = action.payload.sortPacks
        },
        setMaxCardsCount: (state, action: PayloadAction<{ maxCardsCount: number }>) => {
            state.maxCardsCount = action.payload.maxCardsCount
        },
    }
});

export const packsReducer = slice.reducer;
export const {
    setUserId,
    setPacks,
    removeAllFilters,
    setPageCount,
    searchByPackName,
    setOwner,
    setMaxValue,
    setMinValue,
    setPage,
    setTotalCount,
    setSortPacksByDate,
    setMaxCardsCount
} = slice.actions;


export type PackParamsType = {
    pageCount?: number;
    page?: number;
    min?: number;
    max?: number;
    user_id?: string;
    packName?: string;
    sortPacks?: SortPacksType;
    block?: boolean;
}

//Thunk
export const getPacksTC = () => async (dispatch: Dispatch, getState: () => AppRootState) => {

    const {userId, pageCount, page, isMyPack, min, max, search, sortPacks} = getState().packs.params
    let params: PackParamsType = {pageCount, page, min, max, sortPacks};

    if (isMyPack) {
        params.user_id = userId
    }
    if (search) {
        params.packName = search
    }

    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await packsAPI.getPacks(params);
        dispatch(setPacks(res.data.cardPacks));
        dispatch(setMaxCardsCount({maxCardsCount: res.data.maxCardsCount}));
        dispatch(setAppStatusAC({status: "succeeded"}));
        dispatch(setTotalCount({totalCount: res.data.cardPacksTotalCount}))
    } catch (err: any) {
        errorUtils(err, dispatch);
    }
};

export const addNewPackTC = (name: string, isPrivate: boolean) => async (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await packsAPI.addNewPack(name, isPrivate);
        dispatch(getPacksTC())

    } catch (err: any) {
        errorUtils(err, dispatch)
    } finally {
        dispatch(setAppStatusAC({status: "succeeded"}));
    }
};

export const deletePackTC = (packId: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await packsAPI.deletePack(packId)
        dispatch(getPacksTC())
    } catch (err: any) {
        errorUtils(err, dispatch)
    } finally {
        dispatch(setAppStatusAC({status: "succeeded"}));
    }
};

export const updatePacksNameTC = (packId: string, newName: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await packsAPI.updatePackName(packId, newName)
        dispatch(getPacksTC())
    } catch (err: any) {
        errorUtils(err, dispatch)
    } finally {
        dispatch(setAppStatusAC({status: "succeeded"}));
    }
};
