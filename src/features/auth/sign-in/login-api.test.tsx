import {loginAPI} from "./login-api";
//
// test("login request should be strong typing", ()=>{
//     let initialValue = {
//         email: "darya.v.dubrovskaya@gmail.com",
//         password: "12345678D",
//         rememberMe: false
//     }
//
//     expect(loginAPI.login(initialValue).then(res => {
//         return res.data.email
//     } )).toBe("darya.v.dubrovskaya@gmail.com")
// })