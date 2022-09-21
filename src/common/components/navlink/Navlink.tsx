import React from "react";
import styles from "./Navlink.module.css";
import {NavLink} from "react-router-dom";



type PropsType = {
    title: string,
    path: string,
    onClickHandler?: () => void
}

const Link: React.FC<PropsType> = ({title, path, onClickHandler }) => {
    return (
        <NavLink onClick={onClickHandler} className={styles.link} to={path}>{title}</NavLink>
    );
};

export default Link;