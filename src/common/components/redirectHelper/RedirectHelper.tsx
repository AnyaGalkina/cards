import React from "react";
import Navlink from "../navlink/Navlink";
import s from "./RedirectHelper.module.css";

type PropsType = {
    description?: string,
    linkTitle: string,
    path: string,
    onClickHandler?: () => void
}

const RedirectHelper = ({path, description, linkTitle, onClickHandler}: PropsType) => {
    return (
        <div className={s.linkContainer}>
            <p className={s.text}>{description}</p>
            <Navlink onClickHandler={onClickHandler} path={path} title={linkTitle}/>
        </div>
    );
};

export default RedirectHelper;