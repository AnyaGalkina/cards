import React from 'react';
import {Box, Typography} from "@mui/material";
import s from "../Learn.module.css";

type PropsType = {
    questionImg?: string
    question?: string;
    showText: boolean
}

const Question = ({question, questionImg, showText}: PropsType) => {

    return (
        <div>
            {showText?
                <Typography>
                    <span className={s.subTitle}>Question:</span> {question!}
                </Typography>
                :
                <Box
                    sx={{height: '100px'}}
                    component="img"
                    src={questionImg}
                    alt={'question'}
                />
            }


        </div>
    );
};

export default Question;