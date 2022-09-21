const initialState = {};


//TYPES
export type InitialStateType = typeof initialState;

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type){
        default:
           return state
    }
}
//mock action
export type ActionType = {type: "SOME_NAME"};