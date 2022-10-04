import React from "react";
import {Button, Paper, Typography} from "@mui/material";
import s from "./Answer.module.css";

type PropsType = {
    answer: string;
    onNextClickHandler: () => void
}

export const Answer = ({answer, onNextClickHandler}: PropsType) => {
    const grades = ["Did not know", "Forgot", "A lot of thought", "Confused", "Knew it"];

    return (
        <div>
            <Typography className={s.answer}>
                <span className={s.subTitle}>Answer:</span> {answer}
            </Typography>
            <Typography>Rate yourself:</Typography>

            {grades.map((g, i) => (
                <Button key={i} className={s.grade}
                    // onClick={() => onGradeClickHandler()}
                >{g}</Button>
            ))}
            <Button style={{width: "100%"}} variant={"contained"} color={"primary"}
                    onClick={onNextClickHandler}
            >next</Button>
        </div>
    );
};
