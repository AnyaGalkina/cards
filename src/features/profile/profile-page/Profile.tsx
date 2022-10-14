import {Box, Button, Grid, Paper} from "@mui/material";
import React from "react";
import {EditableSpan} from "../../../common/components/editableSpan/EditableSpan";
import {Logout} from "@mui/icons-material";
import s from "./Profile.module.css"
import {logoutTC, updateUserTC} from "./profile-reducer";
import {ROUTES} from "../../../common/enums/enums";
import {Navigate} from "react-router-dom";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {ProfileAvatar} from "../avatar/ProfileAvatar";

const Profile = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.app.status);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const user = useAppSelector(state => state.profile.user);

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
        <Grid container style={{padding: "10px"}} justifyContent={"center"}>
            <Grid item justifyContent={"center"}>
                <Box sx={{display: "flex"}}>
                    <Paper style={{padding: "20px"}}>
                        <h3 className={s.title}>Personal Information</h3>
                        <ProfileAvatar userAvatar={user.avatar}/>
                        <EditableSpan disabled={status === "loading"} onChange={onChangeName} value={user.name} label={"Your Name"}/>
                        <div className={s.email}>{user.email}</div>
                        <Button  disabled={status === "loading"} variant={"contained"} color={"primary"} onClick={logoutHandler} endIcon={<Logout/>}>
                            Log out
                        </Button>
                    </Paper>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Profile;
