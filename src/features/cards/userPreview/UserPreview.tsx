import React from 'react';
import {Box, Typography} from "@mui/material";
import userAvatar from "../../../assets/images/user.png";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import s from './userPreview.module.css'

const UserPreview = () => {

    const {name, avatar} = useAppSelector(state => state.profile.user)

    return (
        <Box sx={{display: 'flex', justifyContent: 'flex-end', paddingRight: '20px'}}>
        <Box sx={{ width: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
            <Typography variant="subtitle1" gutterBottom>{name}</Typography>
            <div>
            <img className={s.headerAvatar} src={avatar ? avatar : userAvatar} alt={'avatar'}/>
            </div>
        </Box>
        </Box>
    );
};

export default UserPreview;