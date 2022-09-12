import React from "react";
import {Navigate,Route, Routes} from "react-router-dom";
import Profile from "../../../n2-features/f2-profile/Profile";
import Login from "../../../n2-features/f1-auth/a1-login/Login";
import Registration from "../../../n2-features/f1-auth/a2-register/Registration";
import Test from "../../../n2-features/f0-test/Test";
import SetPassword from "../../../n2-features/f1-auth/a4-set-password/SetPassword";
import PasswordRecovery from "../../../n2-features/f1-auth/a3-password-recovary/PasswordRecovery";
import PageNotFound from "./404/PageNotFound";
import Header from "../header/Header";
import {ROUTES} from "../header/nav/Nav";


const Main = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path={ROUTES.PROFILE}  element={<Profile />}/>
                <Route path={ROUTES.LOGIN}  element={<Login />}/>
                <Route path={ROUTES.REGISTRATION}  element={<Registration />}/>
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