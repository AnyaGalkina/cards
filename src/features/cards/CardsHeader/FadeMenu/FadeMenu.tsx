import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import {IconButton} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {DeleteOutline, EditOutlined, SchoolOutlined} from "@mui/icons-material";

export default function FadeMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const IconStyle = {paddingRight: '5px'}


    return (
        <div>
            <IconButton color={'primary'}
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
            >
                <MoreHorizIcon style={{fontSize: 'medium'}}/>
            </IconButton>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>
                    <EditOutlined style={IconStyle}/>
                     Edit
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <DeleteOutline style={IconStyle} />
                     Delete
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <SchoolOutlined style={IconStyle}/>
                     Learn
                </MenuItem>
            </Menu>
        </div>
    );
}
