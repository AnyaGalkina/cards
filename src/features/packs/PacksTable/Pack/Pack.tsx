import * as React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {useNavigate} from "react-router-dom";
import {useCallback, useState} from "react";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {setCardsPackId} from "../../../cards/cards-reducer";
import {UpdateNameModal} from "../../../../common/components/modal/packs/updateNameNodal/UpdateNameModal";
import {DeleteModal} from "../../../../common/components/modal/packs/deleteModal/DeleteModal";


type PackPropsType = {
    id: string
    name: string
    cardsCount: number
    updated: string
    createdBy: string
    userIdFromPack: string
    userId: string
    updatePacksName: (packId: string, name: string) => void
    deletePack: (packId: string) => void
}

export const Pack = React.memo((props: PackPropsType) => {
        const navigate = useNavigate();
        const dispatch = useAppDispatch();

        //State for Update Modal Opened/Closed
        const [openUpdate, setUpdateOpen] = useState(false);
        const openUpdateModalHandler = () => setUpdateOpen(true);
        const closeUpdateModalHandler = () => setUpdateOpen(false);

        //State for Delete Modal Opened/Closed
        const [openDelete, setDeleteOpen] = useState(false);
        const openDeleteModalHandler = () => setDeleteOpen(true);
        const closeDeleteModalHandler = () => setDeleteOpen(false);

        const goToCardsHandler = useCallback(() => {
            dispatch(setCardsPackId(props.id))
            navigate(`/cards/card/${props.id}`)
        }, [props.id])

        return (
            <TableRow
                key={props.id}
            >
                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    onClick={goToCardsHandler}
                >
                    <a>{props.name}</a>
                </TableCell>
                <TableCell align="left">{props.cardsCount}</TableCell>
                <TableCell align="left">{props.updated}</TableCell>
                <TableCell align="left">{props.createdBy}</TableCell>
                <TableCell align="left">
                    <MenuOutlinedIcon/>
                    {props.userIdFromPack === props.userId
                        ?
                        <>
                            <CreateOutlinedIcon
                                onClick={openUpdateModalHandler}/>
                            <DeleteOutlinedIcon
                                onClick={openDeleteModalHandler}/>
                        </>
                        : null}
                    <UpdateNameModal updatePacksName={props.updatePacksName}
                                     packId={props.id}
                                     packName={props.name}
                                     open={openUpdate}
                                     setClose={closeUpdateModalHandler}/>
                    <DeleteModal deletePack={props.deletePack}
                                 packId={props.id}
                                 packName={props.name}
                                 open={openDelete}
                                 setClose={closeDeleteModalHandler}/>
                </TableCell>
            </TableRow>
        )
    }
)
