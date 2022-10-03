import React from 'react';
import {Button, Grid, Paper, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Learn = () => {
    const showAnswerHandler = () => {
    }

    return (
        <Grid  container style={{padding: '10px'}} justifyContent={"center"}>
            <Grid item justifyContent={"center"}>
            <Button href={'#/cards/pack'} color={'primary'} startIcon={ <ArrowBackIcon/>}>
                Back to Packs
            </Button>
            <Typography>Learn PACK NAME </Typography>
            <Paper style={{padding: '20px'}}>
                <Typography>card question </Typography>
                <Typography>attempts</Typography>
            <Button onClick={showAnswerHandler} variant={'contained'} color={'primary'} >
                Show answer
            </Button>
                {/*if button was clicked show:*/}
                <Typography>answer and grades </Typography>
            </Paper>
            </Grid>
        </Grid>
    );
};

