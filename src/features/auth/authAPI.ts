import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
   baseURL: "https://neko-back.herokuapp.com/2.0" || "http://localhost:7542/2.0/",
});

export const authAPI = {
    signUp( payload: {email: string, password: string}) {
        return instance.post("/auth/register", payload);
    },
    updateUser(data: UpdateUserType) {
        return instance.put<UpdateUserType, AxiosResponse<ResUpdateUserType>>('auth/me', data)
    },
    logout(){
        return instance.delete<ResLogoutType>('auth/me')
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

export type UpdateUserType = {
    name: string,
    avatar: string | null
}

export type ResUpdateUserType = {
    updatedUser: UserType
    token: string
    tokenDeathTime: number
}

type ResLogoutType = {
    info: string;
    error: string;
}

export type UserType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    token: string
    tokenDeathTime: number
    avatar: string | null
}

