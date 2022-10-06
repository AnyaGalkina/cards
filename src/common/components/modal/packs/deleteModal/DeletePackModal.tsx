import React from "react";
import {BasicModal} from "../../Modal";
import {Typography} from "@mui/material";

type DeletePackModalType = {
    deletePack: (packId: string) => void
    packId: string
    packName: string | undefined
    open: boolean
    setClose: () => void
}

export const DeletePackModal = (props: DeletePackModalType) => {

    const {open, setClose, packId, packName, deletePack} = props;

    const deletePackHandler = () => {
        deletePack(packId);
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