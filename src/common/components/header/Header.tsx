import React from "react";
import s from "./Header.module.css";
import eduLogo from "../../../assets/images/eduLogo.png";
import {Avatar} from "@mui/material";
import avatar from "../../../assets/images/user.png";
import {useAppSelector} from "../../hooks/useAppSelector";

export const Header = () => {
    const user = useAppSelector(state => state.profile.user);
    const name = useAppSelector(state => state.profile.user.name);

    return (
        <div className={s.header}>
            <img className={s.logo} src={eduLogo} alt={"logo"}/>
            <div className={s.avatar}>
                <span>{name}</span>
                <Avatar src={user.avatar ? user.avatar : avatar} />
            </div>
        </div>
    );
};