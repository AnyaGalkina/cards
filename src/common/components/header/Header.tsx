import React from "react";
import s from "./Header.module.css";
import eduLogo from "../../../assets/images/eduLogo.png";
import {useAppSelector} from "../../hooks/useAppSelector";
import {AccountMenu} from "./menu/Menu";

export const Header = () => {
    const name = useAppSelector(state => state.profile.user.name);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    return (
        <div className={s.header}>
            <img className={s.logo}
                 src={eduLogo}
                 alt={"logo"}/>
            {isLoggedIn &&
                <div className={s.avatar}>
                    <span className={s.name}>{name}</span>
                    <AccountMenu/>
                </div>
            }
        </div>
    );
};