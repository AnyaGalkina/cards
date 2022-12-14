import TableCell from "@mui/material/TableCell";
import {Box, Rating} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {DeleteCardModal} from "../../../../common/components/modal/cards/deleteCardModal/DeleteCardModal";
import TableRow from "@mui/material/TableRow";
import React, {useState} from "react";
import {CardsData} from "../../../../common/utils/createData";
import {UpdateCardModal} from "../../../../common/components/modal/cards/updateCardMaodal/UpdateCardModal";

type CardPropsType = {
    card: CardsData
    deleteCardHandler: (cardId: string, packId: string) => void
    updateCardHandler: (cardId: string, packId: string, question?: string, answer?: string, questionImg?: string, answerImg?: string) => void
    myProfile: boolean
}

export const Card = (props: CardPropsType) => {

    const {card, deleteCardHandler, updateCardHandler, myProfile} = props;

    //State for Delete Modal Opened/Closed
    const [openDelete, setDeleteOpen] = useState(false);
    const openDeleteModalHandler = () => setDeleteOpen(true);
    const closeDeleteModalHandler = () => setDeleteOpen(false);

    //State for Update Modal Opened/Closed
    const [openUpdate, setUpdateOpen] = useState(false);
    const openUpdateModalHandler = () => setUpdateOpen(true);
    const closeUpdateModalHandler = () => setUpdateOpen(false);

    return <>
        <TableRow
            key={card.cardId}
        >
            <TableCell
            >
                {card.questionImg ? (
                        <Box
                            sx={{height: '50px'}}
                            component="img"
                            src={card.questionImg}
                            alt={'question'}
                        />
                    ) :
                    card.question
                }
            </TableCell>
            <TableCell align="left">
                {card.answerImg ?
                    <Box
                        sx={{height: '50px'}}
                        component="img"
                        src={card.answerImg}
                        alt={'answer'}
                    />
                    : card.answer}
            </TableCell>
            <TableCell align="left">{card.updated}</TableCell>
            <TableCell align="left">
                <Rating value={card.grade}/>
            </TableCell>
            {myProfile ?
                (<TableCell>
                        <Edit onClick={openUpdateModalHandler}/>
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
            {card.question && card.answer
                ? <UpdateCardModal updateCard={updateCardHandler}
                                   cardId={card.cardId}
                                   packId={card.cardsPack_id}
                                   question={card.question}
                                   answer={card.answer}
                                   questionImg={card.questionImg}
                                   answerImg={card.answerImg}
                                   open={openUpdate}
                                   setClose={closeUpdateModalHandler}/>
                : null}
        </TableRow>
    </>
}