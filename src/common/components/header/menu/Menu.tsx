import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import avatar from "../../../../assets/images/avatar/user.png";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useNavigate} from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import {ROUTES} from "../../../enums/enums";
import {logoutTC} from "../../../../features/profile/profile-page/profile-reducer";
import {useAppDispatch} from "../../../hooks/useAppDispatch";

export const AccountMenu = () => {
    const dispatch =useAppDispatch();
    const user = useAppSelector(state => state.profile.user);
    const status = useAppSelector(state => state.app.status);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const onProfileClickHandler = () => {
        navigate(ROUTES.PROFILE);
    }
    const onPackClickHandler = () => {
        navigate(ROUTES.PACKS);
    }
    const onLogoutClickHandler = () => {
        dispatch(logoutTC());
        navigate(ROUTES.LOGIN);
    }

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Box sx={{display: "flex", alignItems: "center", textAlign: "center"}}>
                <Tooltip title="Account menu">
                    <IconButton
                        disabled={status === "loading"}
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <Avatar
                            style={{cursor: "pointer"}}
                            src={user.avatar ? user.avatar : avatar}
                        />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: "\"\"",
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: "right", vertical: "top"}}
                anchorOrigin={{horizontal: "right", vertical: "bottom"}}
            >
                <MenuItem onClick={onProfileClickHandler}>
                    <Avatar/> Profile
                </MenuItem>
                <MenuItem onClick={onPackClickHandler}>
                    <ListItemIcon>
                        <SchoolIcon  fontSize="small"/>
                    </ListItemIcon>
                    Packs
                </MenuItem>
                <Divider/>
                <MenuItem onClick={onLogoutClickHandler}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
