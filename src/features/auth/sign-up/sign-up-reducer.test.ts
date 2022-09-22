import {InitialStateType, setIsSignedUp, signUpReducer} from "./sign-up-reducer";

let initialState: InitialStateType;

beforeEach(() => {
    initialState = {
        isSignedUp: false
    };
})

test("isSignedUp should be set as true", () => {
    const newState = signUpReducer(initialState, setIsSignedUp({isSignedUp: true}));

    expect(newState.isSignedUp).toBeTruthy();
})