import React from "react";
import styles from "./Navlink.module.css";
import {NavLink} from "react-router-dom";



type PropsType = {
    title: string,
    path: string
}

const Link: React.FC<PropsType> = ({title, path }) => {
    return (
        <NavLink className={styles.link} to={path}>{title}</NavLink>
    );
};

export default Link;