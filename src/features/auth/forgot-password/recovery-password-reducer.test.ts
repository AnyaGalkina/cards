import {InitialStateType, recoveryPasswordReducer, setEmail, setRecoveryPassword,} from "./recovery-password-reducer";

let initialState: InitialStateType;

beforeEach(() => {
    initialState = {
        isRecoveryPasswordAsked: false,
        email: "",
    };
})

test("email should be changed", () => {
    const newState = recoveryPasswordReducer(initialState, setEmail({ email: "123@gmail.com"}));

    expect(newState.email).toBe("123@gmail.com");
});

test("isRecoveryPasswordAsked should be set as true", () => {
    const newState = recoveryPasswordReducer(initialState, setRecoveryPassword({ isRecoveryPasswordAsked: true}));

    expect(newState.isRecoveryPasswordAsked).toBeTruthy();
});