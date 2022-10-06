import TableCell from "@mui/material/TableCell";
import {Rating} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {DeleteCardModal} from "../../../../common/components/modal/cards/deleteCardModal/DeleteCardModal";
import TableRow from "@mui/material/TableRow";
import React, {useState} from "react";
import {CardsData} from "../../../../common/utils/createData";

type CardPropsType = {
    card: CardsData
    deleteCardHandler: (cardId: string, packId: string) => void
    updateCardHandler: (cardId: string, packId: string, name: string) => void
    myProfile: boolean
}

export const Card = (props: CardPropsType) => {

    const {card, deleteCardHandler, updateCardHandler, myProfile} = props;

    //State for Delete Modal Opened/Closed
    const [openDelete, setDeleteOpen] = useState(false);
    const openDeleteModalHandler = () => setDeleteOpen(true);
    const closeDeleteModalHandler = () => setDeleteOpen(false);

    return <>
        <TableRow
            key={card.cardId}
        >
            <TableCell
                component="th"
                scope="row"
                align="left"
            >
                {card.question}
            </TableCell>
            <TableCell align="left">{card.answer}</TableCell>
            <TableCell align="left">{card.updated}</TableCell>
            <TableCell align="left">
                <Rating value={card.grade}/>
            </TableCell>
                {myProfile ?
                    (<TableCell>
                            <Edit onClick={() => updateCardHandler(card.cardId, card.cardsPack_id, 'update question')}/>
                            <Delete onClick={openDeleteModalHandler}/>
                    </TableCell>
                    ) : null
                }
                <DeleteCardModal deleteCard={deleteCardHandler}
                                 packId={card.cardsPack_id}
                                 cardId={card.cardId}
                                 cardName={card.question}
                                 open={openDelete}
                                 setClose={closeDeleteModalHandler}/>

        </TableRow>
    </>
}