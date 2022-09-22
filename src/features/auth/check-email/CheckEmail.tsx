import React from "react";
import {Button, Grid, Paper} from "@mui/material";
import {ROUTES} from "../../../common/components/header/nav/Nav";
import {useNavigate} from "react-router-dom";
import checkEmail from '../../../assets/images/svg/checkEmail.svg'
import s from './CheckEmail.module.css'

const CheckEmail = () => {

    const navigate = useNavigate()

    const checkEmailHandler = () => {
        navigate(ROUTES.LOGIN)
    }

    return (
        <div>
            <Grid container style={{padding: '20px'}} justifyContent={"center"}>
                <Grid item>
                    <Paper style={{padding: '20px'}}>
                        <h3 className={s.title}>
                            Check Email
                        </h3>
                        <img src={checkEmail} alt={'checkEmail'}/>
                        <div className={s.info}>We've sent an Email with instruction to EMAIL</div>
                        <Button variant={'contained'} color={'primary'} onClick={checkEmailHandler}>
                            Back to login
                          </Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default CheckEmail;