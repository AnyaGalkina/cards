import {authReducer, setEmail, setRecoveryPassword, setIsSignedUp} from "./auth-reducer";


let initialState;

beforeEach(() => {
    initialState = {
        isLoggedIn: false,
        isSignedUp: false,
        isRecoveryPasswordAsked: false,
        email: "",
    };
})

// test("email should be changed", () => {
//     const newState = authReducer(initialState, setEmail( {email: "123@gmail.com"}));
//
//     expect(newState.email).toBe("123@gmail.com");
// });
//
// test("isRecoveryPasswordAsked should be set as true", () => {
//     const newState = authReducer(initialState, setRecoveryPassword({ isRecoveryPasswordAsked: true}));
//
//     expect(newState.isRecoveryPasswordAsked).toBeTruthy();
// });
//
// test("isSignedUp should be set as true", () => {
//     const newState = authReducer(initialState, setIsSignedUp(initialState, {isSignedUp: true}));
//
//     expect(newState.isSignedUp).toBeTruthy();
