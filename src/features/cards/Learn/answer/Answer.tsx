import React from "react";
import {Box, Typography} from "@mui/material";
import s from "./Answer.module.css";
import {Grade} from "../Grade/Grade";

type PropsType = {
    answerImg?: string
    answer?: string;
    onNextClickHandler: (grade: number) => void
    showText: boolean
}

export const Answer = ({answerImg, answer, onNextClickHandler, showText}: PropsType) => {
    return (
        <div>
            {showText?
                <Typography className={s.answer}>
                    <span className={s.subTitle}>Answer:</span> {answer}
                </Typography>
                :
                <Box
                    sx={{height: '100px'}}
                    component="img"
                    src={answerImg}
                    alt={'question'}
                />
            }
            <Grade onNextClickHandler={onNextClickHandler} />
        </div>
    );
};



