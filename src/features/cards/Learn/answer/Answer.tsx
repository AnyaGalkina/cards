import React from "react";
import {Button, Typography} from "@mui/material";
import s from "./Answer.module.css";

type PropsType = {
    answer: string;
    onNextClickHandler: () => void
    onGradeClickHandler: (grade:number) => void
}

export const Answer = ({answer, onNextClickHandler, onGradeClickHandler}: PropsType) => {
    const grades = [{grade: 1, buttonName:"Did not know"},
        {grade: 2, buttonName:"Forgot"},
        {grade: 3, buttonName:"A lot of thought"},
        {grade: 4, buttonName:"Confused"},
        {grade: 5, buttonName:"Knew it"}];

    return (
        <div>
            <Typography className={s.answer}>
                <span className={s.subTitle}>Answer:</span> {answer}
            </Typography>
            <Typography>Rate yourself:</Typography>

            {grades.map((g, i) => (
                <Button key={i} className={s.grade}
                    onClick={() => onGradeClickHandler(g.grade)}
                >{g.buttonName}</Button>
            ))}
            <Button style={{width: "100%"}} variant={"contained"} color={"primary"}
                    onClick={onNextClickHandler}
            >next</Button>
        </div>
    );
};
