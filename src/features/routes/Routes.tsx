import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../auth/login/Login";
import {ROUTES} from "../../common/enums/enums";
import Profile from "../profile/profile-page/Profile";
import {SignUp} from "../auth/sign-up/SignUp";
import {PasswordRecovery} from "../auth/forgot-password/PasswordRecovery";
import {SetPassword} from "../auth/new-password/SetPassword";
import CheckEmail from "../auth/check-email/CheckEmail";
import PageNotFound from "../../common/components/404/PageNotFound";
import Cards from "../cards/Cards";
import {Packs} from "../packs/Packs";

export const RoutesComponent = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Login/>}/>
            <Route path={ROUTES.PROFILE} element={<Profile/>}/>
            <Route path={ROUTES.LOGIN} element={<Login/>}/>
            <Route path={ROUTES.REGISTRATION} element={<SignUp/>}/>
            <Route path={ROUTES.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
            <Route path={ROUTES.SET_PASSWORD} element={<SetPassword/>}/>
            <Route path={ROUTES.CHECK_EMAIL} element={<CheckEmail/>}/>
            <Route path={ROUTES.PAGE_NOT_FOUND} element={<PageNotFound/>}/>
            <Route path={ROUTES.CARDS} element={<Cards/>}>
                <Route path=":cardsPack_id" element={<Cards/>}/>
            </Route>
            <Route path={ROUTES.PACKS} element={<Packs/>}/>
            <Route path={"/*"} element={<Navigate to={ROUTES.PAGE_NOT_FOUND}/>}/>
            {/*звездочка всегда внизу*/}
        </Routes>
    );
};
