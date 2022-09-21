import {Button, Grid, Paper} from "@mui/material";
import React, {useCallback} from "react";
import {EditableSpan} from "../../../common/components/EditableSpan/EditableSpan";
import {Logout} from "@mui/icons-material";
import s from './Profile.module.css'
import {useSelector} from "react-redux";
import {AppRootState} from "../../../app/store";
import {logoutTC, updateUserTC} from "./profile-reducer";
import {ROUTES} from "../../../common/components/header/nav/Nav";
import { Navigate } from "react-router-dom";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";

const Profile = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn);
    const userName = useSelector<AppRootState, string>(state => state.profile.name);

    const onChangeName = (name:string) => {
        dispatch(updateUserTC({name}))
    }

    const logoutHandler = useCallback(()=>{
        dispatch(logoutTC())
    },[])

    if (!isLoggedIn) {
        return <Navigate to={ROUTES.LOGIN} />;
    }

    return (
        <Grid container style={{padding: '20px'}} justifyContent={"center"}>
            <Grid item>
                <Paper style={{padding: '20px'}}>
                    <h3 className={s.title}>Personal Information</h3>
                    <div className={s.avatar}></div>
                    <EditableSpan onChange={onChangeName} value={userName} label={'Your Name'} />
                    <div className={s.email}>gmail.com</div>
                    <Button variant={'contained'} color={'primary'} onClick={logoutHandler}>
                        Log out
                        <Logout/></Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Profile;
