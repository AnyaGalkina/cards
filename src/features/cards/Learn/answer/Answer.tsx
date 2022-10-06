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
            {/*<Typography>Rate yourself:</Typography>*/}

            {/*{grades.map((g, i) => (*/}
            {/*    <Button key={i} className={s.grade}*/}
            {/*            onClick={() => onGradeClickHandler(g.grade)}*/}
            {/*    >{g.buttonName}</Button>*/}
            {/*))}*/}

            <Grade onNextClickHandler={onNextClickHandler} />

            {/*<Button style={{width: "100%"}} variant={"contained"} color={"primary"}*/}
            {/*        onClick={onNextClickHandler}*/}
            {/*>next</Button>*/}
        </div>
    );
};



