import axios from "axios";


export const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0" || "http://localhost:7542/2.0/",
});


export const authAPI = {
    signUp(payload: { email: string, password: string }) {
        return instance.post<RegisterResType>("/auth/register", payload);
    },

    forgotPassword(payload: { email: string }) {
        return instance.post<InfoResType>("/auth/forgot", payload);
    },
    setNewPassword(payload: { password: string, resetPasswordToken: string }) {
        return instance.post<{ info: string }>("/auth/set-new-password", payload);
    }
}


type ErrorPostResType = {
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

export type InfoResType = {
    info: string;
    success: true;
    answer: false;
    html: false;
    error?: string;
}