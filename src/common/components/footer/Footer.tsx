import React from "react";
import styles from "./Footer.module.css";
import Divider from "@mui/material/Divider";


export const Footer = () => {
    return (
        <div>
            <Divider/>
            <div className={styles.footer}>
                <span>Copyright © 2022 Friday Girls Team</span>
            </div>
        </div>
    );
};
