import React from "react";
import {Typography} from "@mui/material";
import s from "./Answer.module.css";
import {Grade} from "../Grade/Grade";

type PropsType = {
    answer: string;
    onNextClickHandler: (grade: number) => void
}

export const Answer = ({answer, onNextClickHandler}: PropsType) => {
    return (
        <div>
            <Typography className={s.answer}>
                <span className={s.subTitle}>Answer:</span> {answer}
            </Typography>
            <Grade onNextClickHandler={onNextClickHandler} />
        </div>
    );
};



