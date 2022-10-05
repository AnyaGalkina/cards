import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {BasicModal} from "../../Modal";
import {TextField, Typography} from "@mui/material";

type DeleteModalType = {
    deletePack: (packId: string) => void
    packId: string
    packName: string
    open: boolean
    setClose: () => void
}

export const DeleteModal = (props: DeleteModalType) => {

    const {open, setClose, packId, packName, deletePack} = props;

    const deletePackHandler = () => {
        deletePack(packId)
        setClose();
    }

    return <>
        <BasicModal open={open}
                    title={'Edit Pack'}
                    buttonTitle={'Delete'}
                    onSaveDeleteClickHandler={deletePackHandler}
                    onCancelClickHandler={setClose}>
            <div>
                <Typography>
                    Do you really want to remove {packName}?
                    All cards will be deleted.
                </Typography>
            </div>
        </BasicModal>
    </>
}