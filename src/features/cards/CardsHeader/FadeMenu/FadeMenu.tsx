import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import {IconButton} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {DeleteOutline, EditOutlined, SchoolOutlined} from "@mui/icons-material";
import {useCallback, useState} from "react";
import {deletePackTC, updatePacksNameTC} from "../../../packs/packs-reducer";
import {UpdateNameModal} from "../../../../common/components/modal/packs/updateNameNodal/UpdateNameModal";
import {DeleteModal} from "../../../../common/components/modal/packs/deleteModal/DeleteModal";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {useNavigate} from "react-router-dom";

type FadeMenuPropsType = {
    learnHandler: () => void
    packId: string
    packName: string
}

export const FadeMenu: React.FC<FadeMenuPropsType> = ({learnHandler, packId, packName}) => {

    // const dispatch = useAppDispatch();
    // const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const IconStyle = {paddingRight: '5px'}

    // //State for Update Modal Opened/Closed
    // const [openUpdate, setUpdateOpen] = useState(false);
    // const openUpdateModalHandler = () => setUpdateOpen(true);
    // const closeUpdateModalHandler = () => setUpdateOpen(false);
    //
    // //State for Delete Modal Opened/Closed
    // const [openDelete, setDeleteOpen] = useState(false);
    // const openDeleteModalHandler = () => setDeleteOpen(true);
    // const closeDeleteModalHandler = () => setDeleteOpen(false);
    //
    // const deletePack = useCallback((packId: string) => {
    //     dispatch(deletePackTC(packId))
    //     navigate(/cards/pack)
    // } , [dispatch]);
    //
    // const updatePacksName = useCallback((packId: string, name: string) => dispatch(updatePacksNameTC(packId, name)), [dispatch]);


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
                <MenuItem
                    // onClick={openUpdateModalHandler}
                >
                    <EditOutlined style={IconStyle}/>
                    Edit
                </MenuItem>
                <MenuItem
                    // onClick={openDeleteModalHandler}
                >
                    <DeleteOutline style={IconStyle} />
                    Delete
                </MenuItem>
                <MenuItem onClick={learnHandler}>
                    <SchoolOutlined style={IconStyle}/>
                    Learn
                </MenuItem>
                {/*<UpdateNameModal updatePacksName={updatePacksName}*/}
                {/*                 packId={packId}*/}
                {/*                 packName={packName}*/}
                {/*                 open={openUpdate}*/}
                {/*                 setClose={closeUpdateModalHandler}/>*/}
                {/*<DeleteModal deletePack={deletePack}*/}
                {/*             packId={packId}*/}
                {/*             packName={packName}*/}
                {/*             open={openDelete}*/}
                {/*             setClose={closeDeleteModalHandler}/>*/}
            </Menu>
        </div>
    );
}
