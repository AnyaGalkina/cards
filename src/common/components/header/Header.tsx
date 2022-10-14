import React from "react";
import s from "./Header.module.css";
import eduLogo from "../../../assets/images/eduLogo.png";
import {Avatar} from "@mui/material";
import avatar from "../../../assets/images/avatar/user.png";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useNavigate} from "react-router-dom";

export const Header = () => {
    const user = useAppSelector(state => state.profile.user);
    const name = useAppSelector(state => state.profile.user.name);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);


    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate(`/profile`)
    }


    return (
        <div className={s.header}>
            <img className={s.logo}
                 src={eduLogo}
                 alt={"logo"}/>
            {isLoggedIn &&
                <div className={s.avatar}>
                    <span className={s.name}>{name}</span>
                    <Avatar
                        style={{cursor: "pointer"}}
                        src={user.avatar ? user.avatar : avatar}
                        onClick={onClickHandler}
                    />
                </div>
            }
        </div>
    );
};