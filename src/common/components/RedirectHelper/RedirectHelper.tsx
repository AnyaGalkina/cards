import React from "react";
import Navlink from "../navlink/Navlink";
import s from "./RedirectHelper.module.css";

type PropsType = {
    description?: string,
    linkTitle: string,
    path: string
}

const RedirectHelper = ({path, description, linkTitle}: PropsType) => {
    return (
        <div>
            <p className={s.text}>{description}</p>
            <Navlink path={path} title={linkTitle}/>
        </div>
    );
};

export default RedirectHelper;