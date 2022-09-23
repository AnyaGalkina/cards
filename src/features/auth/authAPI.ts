import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL:  process.env.REACT_APP_URL || "http://localhost:7542/2.0",
    withCredentials: true
});


export const authAPI = {
    signUp(payload: SignUpType) {
        return instance.post<SignUpType, AxiosResponse<RegisterResType>>("/auth/register", payload);
    },
    forgotPassword(payload: ForgotPasswordType) {
        return instance.post<ForgotPasswordType, AxiosResponse<InfoResType>>("/auth/forgot", payload);
    },
    setNewPassword(payload: { password: string, resetPasswordToken: string }) {
        return instance.post<AxiosResponse<SetNewPasswordType>>("/auth/set-new-password", payload);
    },
    updateUser(data: UpdateUserType) {
        return instance.put<UpdateUserType, AxiosResponse<ResUpdateUserType>>('/auth/me', data)
    },
    logout(){
        return instance.delete<ResLogoutType>('/auth/me')
    },
    login(data: LoginRequestType) {
        return  instance.post<LoginRequestType, AxiosResponse<UserType>>('/auth/login', data)
    },
    me(){
        return instance.post<UserType>('/auth/me')
    }
}


type ErrorPostResType = {
    error: string;
    email?: string;
    in: string;
}

export type LoginRequestType = {
    email?: string | undefined
    password?: string | undefined
    rememberMe?: boolean
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
export type UpdateUserType = {
    name?: string,
    avatar?: string
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
    avatar?: string
}

export type SignUpType = {
    email: string
    password: string
}

export type ForgotPasswordType = { email: string }

export type SetNewPasswordType = { info: string }