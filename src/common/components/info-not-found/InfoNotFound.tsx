import React from "react";
import s from "./InfoNotFound.module.css";

type PropsType = {
    itemName: string
}

export const InfoNotFound = ({itemName}: PropsType) => {
    return (
        <div className={s.info}>
            {itemName} not found
        </div>
    );
};