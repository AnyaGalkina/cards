const initialState = {};


export const profileReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        default:
            return state;
    }
}


//TYPES
export type InitialStateType = typeof initialState;

//mock action
export type ActionType = {type: "SOME_NAME"};