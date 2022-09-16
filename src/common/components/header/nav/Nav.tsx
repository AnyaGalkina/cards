import React from "react";
import Link from "../../navlink/Navlink";
import styles from "./Nav.module.css";

export enum ROUTES {
    PROFILE = "/profile",
    LOGIN = "/login",
    REGISTRATION = "/registration",
    TEST = "/test",
    PASSWORD_RECOVERY = "/password_recovery",
    SET_PASSWORD = "/set_password",
    PAGE_NOT_FOUND = "/404"
}

const Nav = () => {
    return (
        <div className={styles.nav}>
            <Link path={ROUTES.PROFILE} title={"profile"} />
            <Link path={ROUTES.TEST} title={"test"} />
            <Link path={ROUTES.LOGIN} title={"login"} />
            <Link path={ROUTES.REGISTRATION} title={"registration"} />
            <Link path={ROUTES.PASSWORD_RECOVERY} title={"forgotPassword"} />
            <Link path={ROUTES.SET_PASSWORD} title={"setPassword"} />
        </div>
    );
};

export default Nav;