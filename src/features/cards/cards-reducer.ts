import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    card: {
    }
}


const slice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {
    }
})

export const cardsReducer = slice.reducer
export const {} = slice.actions