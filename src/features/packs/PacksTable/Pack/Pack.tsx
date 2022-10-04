import * as React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {setCardsPackId} from "../../../cards/cards-reducer";
import {BasicModal} from "../../../../common/components/modal/Modal";

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

        const updatePacksName = useCallback(() => props.updatePacksName(props.id, 'updated name'), [props.updatePacksName, props.id])
        const deletePack = useCallback(() => props.deletePack(props.id), [props.deletePack, props.id])
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
                                onClick={updatePacksName}/>
                            <DeleteOutlinedIcon
                                onClick={deletePack}/>
                        </>
                        : null}
                </TableCell>
            </TableRow>
        )
    }
)
