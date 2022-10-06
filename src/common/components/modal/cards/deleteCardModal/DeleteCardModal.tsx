import React from "react";
import {BasicModal} from "../../Modal";
import {Typography} from "@mui/material";

type DeleteCardModalType = {
    deleteCard: (cardId: string, packId: string) => void
    packId: string
    cardId: string
    cardName: string | undefined
    open: boolean
    setClose: () => void
}

export const DeleteCardModal = (props: DeleteCardModalType) => {

    const {open, setClose, packId, cardId, cardName, deleteCard} = props;

    const deleteCardHandler = () => {
        deleteCard(cardId, packId);
        setClose();
    }

    return <>
        <BasicModal open={open}
                    title={'Delete Card'}
                    buttonTitle={'Delete'}
                    onSaveDeleteClickHandler={deleteCardHandler}
                    onCancelClickHandler={setClose}>
            <div>
                <Typography>
                    Do you really want to remove {cardName}?
                </Typography>
            </div>
        </BasicModal>
    </>
}