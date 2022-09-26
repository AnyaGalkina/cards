import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../../app/app-reducer";


type OwnerType = "me" | "all";

const defaultFilterValues = {
    min: 0,
    //Data from server
    max: 10,
    owner: "all" as OwnerType,
    // isFiltersDefaultValues: true
}

type DefaultFilterValues = typeof defaultFilterValues;

export const initialState = {
    min: defaultFilterValues.min,
    max: defaultFilterValues.max,
    owner: defaultFilterValues.owner,
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

        },
    }
})

export const filtersReducer = slice.reducer;
export const {setDefaultValues, setMaxValue, setMinValue} = slice.actions;


// Thunks
export const removeAllFilters =  () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}));
    try {
        // const response =  await packAPI.getpacks();
        // packAPI:{
        // get packs...
        // }
        dispatch(setDefaultValues(defaultFilterValues));
        dispatch(setAppStatusAC({status: "succeeded"}));
    } catch (e) {
    }
}

