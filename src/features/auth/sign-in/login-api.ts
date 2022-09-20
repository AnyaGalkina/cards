import axios, {AxiosResponse} from "axios";

const instance = axios.create({
        baseURL: 'http://localhost:7542/2.0',
        withCredentials: true
    }
);

//Login API
export const loginAPI = {
    login(data: LoginRequestType) {
       return  instance.post<LoginRequestType, AxiosResponse<LoginResponseType | LoginErrorResponseType>>('/auth/login', data)
    },
    me(){
        return instance.post<AxiosResponse<LoginResponseType | LoginErrorResponseType>>('/auth/me')
    }
}

//Types
export type LoginRequestType = {
    email?: string | undefined
    password?: string | undefined
    rememberMe?: boolean
}

type LoginResponseType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: Date
    updated: Date
    __v: number
    token: string
    tokenDeathTime: number
    avatar?: string
}
export type LoginErrorResponseType = {
    email: string
    error: string
    in?: "logIn"
}

