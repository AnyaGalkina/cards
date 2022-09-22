import {Box, Button, Grid, Paper} from "@mui/material";
import React from "react";
import {EditableSpan} from "../../../common/components/EditableSpan/EditableSpan";
import {Logout} from "@mui/icons-material";
import s from './Profile.module.css'
import {useSelector} from "react-redux";
import {AppRootState} from "../../../app/store";
import {logoutTC, updateUserTC} from "./profile-reducer";
import {ROUTES} from "../../../common/components/header/nav/Nav";
import {Navigate} from "react-router-dom";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {UserType} from "../../auth/authAPI";
import avatar from  "../../../assets/images/user.png"

const Profile = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn);
    const user = useSelector<AppRootState, UserType>(state => state.profile.user);

    const onChangeName = (name: string) => {
        dispatch(updateUserTC({name}))
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) {
        return <Navigate to={ROUTES.LOGIN}/>;
    }

    return (
        <Grid  container style={{padding: '10px'}} justifyContent={"center"}>
            <Grid item justifyContent={"center"}>
        <Box sx={{ display: 'flex'}}>
                <Paper style={{padding: '20px'}} >
                    <h3 className={s.title}>Personal Information</h3>
                    <img className={s.avatar} src={user.avatar ? user.avatar : avatar} alt={'avatar'}/>
                    <EditableSpan onChange={onChangeName} value={user.name} label={'Your Name'}/>
                    <div className={s.email}>{user.email}</div>
                    <Button variant={'contained'} color={'primary'} onClick={logoutHandler} endIcon={<Logout/>}>
                        Log out
                        </Button>
                </Paper>
        </Box>
           </Grid>
         </Grid>
    );
};

export default Profile;
