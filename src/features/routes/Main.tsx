import React, {useEffect} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
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
import {initializeAppTC, RequestStatusType} from "../../app/app-reducer";
import {AppRootState} from "../../app/store";
import {CircularProgress, LinearProgress} from "@mui/material";
import {ErrorSnackbar} from "../../common/components/error/ErrorSnackbar";
import CheckEmail from "../auth/check-email/CheckEmail";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";


const Main = () => {
    const dispatch = useAppDispatch();
    const isInitialized = useSelector<AppRootState, boolean>(state => state.app.isInitialized);
    const appStatus = useSelector<AppRootState, RequestStatusType>(state => state.app.status);

    useEffect(() => {
        dispatch(initializeAppTC())
    }, []);

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div>
            <Header/>
            <ErrorSnackbar/>
            {appStatus === "loading" && <LinearProgress/>}
            <Routes>
                <Route path={ROUTES.PROFILE} element={<Profile/>}/>
                <Route path={ROUTES.LOGIN} element={<Login/>}/>
                <Route path={ROUTES.REGISTRATION} element={<SignUp/>}/>
                <Route path={ROUTES.TEST} element={<Test/>}/>
                <Route path={ROUTES.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={ROUTES.SET_PASSWORD} element={<SetPassword/>}/>
                <Route path={ROUTES.CHECK_EMAIL} element={<CheckEmail/>}/>
                <Route path={ROUTES.PAGE_NOT_FOUND} element={<PageNotFound/>}/>
                <Route path={"/*"} element={<Navigate to={ROUTES.PAGE_NOT_FOUND}/>}/>
            </Routes>
        </div>
    );
};

export default Main;