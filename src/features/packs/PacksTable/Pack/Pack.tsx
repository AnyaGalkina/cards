import * as React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {useNavigate} from "react-router-dom";
import {useCallback, useState} from "react";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {getCardsTC, setCardsPackId, setCardsPageCount} from "../../../cards/cards-reducer";
import {SchoolOutlined} from "@mui/icons-material";
import {UpdateNameModal} from "../../../../common/components/modal/packs/updateNameNodal/UpdateNameModal";
import {DeletePackModal} from "../../../../common/components/modal/packs/deleteModal/DeletePackModal";
import {Box} from "@mui/material";
import teachLogo from "../../../../assets/images/teach-me-logo.jpg"


type PackPropsType = {
    id: string
    name: string
    cardsCount: number
    deckCover: string | undefined
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

        const learnHandler = () => {
            debugger
            if (props.id) {
                dispatch(setCardsPageCount({pageCount: props.cardsCount}));
                dispatch(getCardsTC(props.id));
                navigate(`/learn/${props.id}`);
            }
        }

        return (
            <TableRow
                key={props.id}
            >
                <TableCell align="left">
                    <Box
                        sx={{height: '50px'}}
                        component="img"
                        src={props.deckCover ? props.deckCover : teachLogo}
                        alt={'question'}
                    />
                </TableCell>
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
                    <SchoolOutlined onClick={learnHandler}/>
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
                    <DeletePackModal deletePack={props.deletePack}
                                     packId={props.id}
                                     packName={props.name}
                                     open={openDelete}
                                     setClose={closeDeleteModalHandler}/>
                </TableCell>
            </TableRow>
        )
    }
)
