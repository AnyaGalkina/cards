import * as React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {useNavigate} from "react-router-dom";

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

        const updatePacksName = () => props.updatePacksName(props.id, 'updated name')
        const deletePack = () => props.deletePack(props.id)
        const goToCardsHandler = () => navigate(`/cards/card/${props.id}`)

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
