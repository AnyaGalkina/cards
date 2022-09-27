import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../../app/app-reducer";
import {errorUtils} from "../../utils/errorUtils";


type OwnerType = "me" | "all";

const defaultFilterValues = {
    min: 0,
    //Data from server
    max: 10,
    owner: "all" as OwnerType,
    search: null as null | string
}

type DefaultFilterValues = typeof defaultFilterValues;

export const initialState = {
    min: defaultFilterValues.min,
    max: defaultFilterValues.max,
    owner: defaultFilterValues.owner,
    page: 4,
    pageCount: 5,
    search: defaultFilterValues.search
}

const slice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        //Any optimization ??
        setDefaultValues: (state, action: PayloadAction<DefaultFilterValues>) => {
            state.min = action.payload.min;
            state.max = action.payload.max;
            state.owner = action.payload.owner;
        },
        setMinValue: (state, action: PayloadAction<{ min: number }>) => {

        },
        setMaxValue: (state, action: PayloadAction<{ max: number }>) => {

        },
        setOwner: (state, action: PayloadAction<{ owner: OwnerType }>) => {
            state.owner = action.payload.owner
        },
        setPage: (state, action: PayloadAction<{ page: number }>) => {
            state.page = action.payload.page
        },
        setPageCount: (state, action: PayloadAction<{ pageCount: number }>) => {
            state.pageCount = action.payload.pageCount
        },
        searchByPackName: (state, action: PayloadAction<{ search: string }>) => {
            state.search = action.payload.search
        },
    }
})

export const filtersReducer = slice.reducer;
export const {setDefaultValues, setPageCount, searchByPackName, setOwner,  setMaxValue, setMinValue, setPage} = slice.actions;


// Thunks
export const removeAllFiltersTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}));
    try {
        // const response =  await packAPI.getpacks();
        dispatch(setDefaultValues(defaultFilterValues));
        dispatch(setAppStatusAC({status: "succeeded"}));
    } catch (err: any) {
        errorUtils(err, dispatch);
    }
}

// export const setPageTC = (page: number) => async (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({status: "loading"}));
//     try {
//         // const response =  await packAPI.getpacks();
//
//         dispatch(setPage({page}));
//         dispatch(setAppStatusAC({status: "succeeded"}));
//     } catch (err: any) {
//         errorUtils(err, dispatch);
//     }
// }
