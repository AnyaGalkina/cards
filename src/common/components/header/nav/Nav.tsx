import React from "react";
import Link from "../../navlink/Navlink";
import styles from "./Nav.module.css";
import {ROUTES} from "../../../enums/enums";
// export enum ROUTES {
//     PROFILE = "/profile",
//     LOGIN = "/login",
//     REGISTRATION = "/registration",
//     PASSWORD_RECOVERY = "/password-recovery",
//     SET_PASSWORD = "/set-new-password/:token",
//     CHECK_EMAIL= "/check-email",
//     PAGE_NOT_FOUND = "/404",
//     CARDS = '/cards/card',
//     PACKS = '/cards/pack'
// }

const Nav = () => {
    return (
        <div className={styles.nav}>
            <Link path={ROUTES.PROFILE} title={"profile"} />
            <Link path={ROUTES.CARDS} title={"cards"} />
            <Link path={ROUTES.PACKS} title={"packs"} />
            <Link path={ROUTES.LOGIN} title={"login"} />
            <Link path={ROUTES.REGISTRATION} title={"registration"} />
            <Link path={ROUTES.PASSWORD_RECOVERY} title={"forgotPassword"} />
            <Link path={ROUTES.SET_PASSWORD} title={"setPassword"} />
            <Link path={ROUTES.CHECK_EMAIL} title={"checkEmail"} />
            <Link title={"test"} path={ROUTES.TEST} />
        </div>
    );
};

export default Nav;