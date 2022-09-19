import axios from "axios";


export const instance = axios.create({
   baseURL: "https://neko-back.herokuapp.com/2.0" || "http://localhost:7542/2.0/",
});


export const authAPI = {
    signUp( payload: {email: string, password: string}) {
        return instance.post("/auth/register", payload);
    }
}


type ErrorPostResType =  {
    error: string;
    email?: string;
    in: string;
}


type AddedUserType = {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
}

export type RegisterResType = {
	addedUser: AddedUserType;
    error?: string;
}
