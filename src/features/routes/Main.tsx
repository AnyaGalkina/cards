import React from "react";
import {Navigate,Route, Routes} from "react-router-dom";
import Profile from "../profile/profile-page/Profile";
import Login from "../auth/sign-in/Login";
import Test from "../../common/components/test/Test";
import SetPassword from "../auth/new-password/SetPassword";
import PasswordRecovery from "../auth/forgot-password/PasswordRecovery";
import PageNotFound from "../../common/components/404/PageNotFound";
import Header from "../../common/components/header/Header";
import {ROUTES} from "../../common/components/header/nav/Nav";
import SignUp from "../auth/sign-up/SignUp";
import {useSelector} from "react-redux";
import {RequestStatusType} from "../../app/app-reducer";
import {AppRootState} from "../../app/store";
import {LinearProgress} from "@mui/material";



const Main = () => {
    const appStatus = useSelector<AppRootState, RequestStatusType>(state => state.app.status);

    return (
        <div>
            <Header />
            {appStatus === "loading" && <LinearProgress/>}
            <Routes>
                <Route path={ROUTES.PROFILE}  element={<Profile />}/>
                <Route path={ROUTES.LOGIN}  element={<Login />}/>
                <Route path={ROUTES.REGISTRATION}  element={<SignUp />}/>
                <Route path={ROUTES.TEST}  element={<Test />}/>
                <Route path={ROUTES.PASSWORD_RECOVERY}  element={<PasswordRecovery />}/>
                <Route path={ROUTES.SET_PASSWORD}  element={<SetPassword />}/>
                <Route path={ROUTES.PAGE_NOT_FOUND}  element={<PageNotFound />}/>
                <Route path={"/*"}  element={<Navigate to={ROUTES.PAGE_NOT_FOUND}/>}/>
            </Routes>
        </div>
    );
};

export default Main;