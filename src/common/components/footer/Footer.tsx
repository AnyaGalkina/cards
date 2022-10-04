import React from "react";
import styles from "./Footer.module.css";
import {Nav} from "./nav/Nav";


export const Footer = () => {
    return (
        <div>
            <div className={styles.footer}>
                <Nav/>
            </div>
        </div>
    );
};
